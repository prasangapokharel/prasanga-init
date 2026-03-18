/**
 * ============================================================================
 * API Service - HTTP Client & Request Manager
 * ============================================================================
 * Centralized HTTP client with retry logic, error handling, and token management
 * Uses: constants, types, api-schema for configuration
 * ============================================================================
 */

import { API_CONFIG, ERROR_MESSAGES } from "../../constants";
import { API_CONFIG as API_SCHEMA_CONFIG } from "../lib/api-schema";
import type {
  ApiResponse,
  ApiError,
  PaginationParams,
} from "../types";

/**
 * Retry Configuration
 */
interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  backoffMultiplier: number;
}

/**
 * Request Options
 */
interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retryConfig?: Partial<RetryConfig>;
  shouldRetry?: (status: number, attempt: number) => boolean;
}

/**
 * API Service Class
 * Main HTTP client for all API communications
 */
class ApiService {
  private baseUrl: string;
  private timeout: number;
  private retryConfig: RetryConfig;
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryConfig = API_SCHEMA_CONFIG.RETRY_CONFIG;
  }

  /**
   * Set authentication tokens
   */
  public setTokens(token: string, refreshToken?: string): void {
    this.token = token;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
  }

  /**
   * Clear authentication tokens
   */
  public clearTokens(): void {
    this.token = null;
    this.refreshToken = null;
  }

  /**
   * Get current token
   */
  public getToken(): string | null {
    return this.token;
  }

  /**
   * Build full URL from endpoint
   */
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Build request headers with authentication
   */
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": `Prasanga-UI/${process.env.EXPO_PUBLIC_APP_VERSION || "unknown"}`,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return { ...headers, ...customHeaders };
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = isJson ? await response.json() : await response.text();
      } catch {
        errorData = null;
      }

      const error = this.parseError(errorData, response.status);
      throw error;
    }

    if (!isJson) {
      throw new Error("Invalid response format: expected JSON");
    }

    return response.json();
  }

  /**
   * Parse error response into ApiError
   */
  private parseError(errorData: any, status: number): ApiError {
    let code = "UNKNOWN_ERROR";
    let message: string = ERROR_MESSAGES.UNKNOWN_ERROR;

    if (errorData?.error) {
      code = errorData.error.code || code;
      message = errorData.error.message || message;
    } else if (errorData?.message) {
      message = errorData.message;
    }

    // Map status codes to error messages
    switch (status) {
      case 400:
        message = ERROR_MESSAGES.VALIDATION_ERROR;
        break;
      case 401:
        code = "UNAUTHORIZED";
        message = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case 404:
        code = "NOT_FOUND";
        message = ERROR_MESSAGES.NOT_FOUND;
        break;
      case 500:
      case 502:
      case 503:
        message = ERROR_MESSAGES.SERVER_ERROR;
        break;
    }

    return {
      code,
      message,
      status,
      details: errorData?.error?.details,
    };
  }

  /**
   * Retry logic with exponential backoff
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    config: RetryConfig,
    attempt: number = 1
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt >= config.maxAttempts;

      if (isLastAttempt || !this.shouldRetry(error as ApiError, attempt)) {
        throw error;
      }

      const delay = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return this.retryWithBackoff(fn, config, attempt + 1);
    }
  }

  /**
   * Determine if request should be retried
   */
  private shouldRetry(error: ApiError, attempt: number): boolean {
    // Retry on network errors and server errors
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    const retryableCodes = ["NETWORK_ERROR", "TIMEOUT", "SERVICE_UNAVAILABLE"];

    return (
      attempt < this.retryConfig.maxAttempts &&
      (retryableStatuses.includes(error.status) || retryableCodes.includes(error.code))
    );
  }

  /**
   * Generic request method with retry logic
   */
  private async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = "GET",
      headers: customHeaders,
      body,
      timeout = this.timeout,
      retryConfig,
    } = options;

    const finalRetryConfig = { ...this.retryConfig, ...retryConfig } as RetryConfig;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const requestFn = async (): Promise<ApiResponse<T>> => {
      try {
        const response = await fetch(url, {
          method,
          headers: this.buildHeaders(customHeaders),
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        return this.handleResponse<T>(response);
      } catch (error) {
        if (error instanceof TypeError) {
          throw {
            code: "NETWORK_ERROR",
            message: ERROR_MESSAGES.NETWORK_ERROR,
            status: 0,
          } as ApiError;
        }

        if ((error as any).name === "AbortError") {
          throw {
            code: "TIMEOUT",
            message: ERROR_MESSAGES.TIMEOUT_ERROR,
            status: 408,
          } as ApiError;
        }

        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    };

    return this.retryWithBackoff(requestFn, finalRetryConfig);
  }

  /**
   * GET request
   */
  public async get<T>(endpoint: string, params?: PaginationParams, options?: RequestOptions): Promise<ApiResponse<T>> {
    const url = this.buildUrlWithParams(this.buildUrl(endpoint), params);
    return this.request<T>(url, { ...options, method: "GET" });
  }

  /**
   * POST request
   */
  public async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(this.buildUrl(endpoint), { ...options, method: "POST", body });
  }

  /**
   * PUT request
   */
  public async put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(this.buildUrl(endpoint), { ...options, method: "PUT", body });
  }

  /**
   * PATCH request
   */
  public async patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(this.buildUrl(endpoint), { ...options, method: "PATCH", body });
  }

  /**
   * DELETE request
   */
  public async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(this.buildUrl(endpoint), { ...options, method: "DELETE" });
  }

  /**
   * Build URL with query parameters
   */
  private buildUrlWithParams(url: string, params?: PaginationParams): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return `${url}?${queryParams.toString()}`;
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class for testing/mocking
export default ApiService;
