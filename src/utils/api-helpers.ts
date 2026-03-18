/**
 * ============================================================================
 * API Helpers - API-Related Utility Functions
 * ============================================================================
 * Helper functions for API operations, response handling, and transformations
 * ============================================================================
 */

import { API_ENDPOINTS } from "../lib/api-schema";
import type { ApiResponse, ApiError, PaginationParams, User } from "../types";

/**
 * Check if API response is successful
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.success === true && response.data !== undefined;
}

/**
 * Check if API response has error
 */
export function isApiError(response: any): response is { success: false; error: ApiError } {
  return response.success === false && response.error !== undefined;
}

/**
 * Extract error message from API response
 */
export function getApiErrorMessage(error: any): string {
  if (typeof error === "string") {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.error?.message) {
    return error.error.message;
  }

  return "An unknown error occurred";
}

/**
 * Extract field-level errors from API response
 */
export function getApiFieldErrors(response: any): Record<string, string[]> {
  return response?.error?.details ?? {};
}

/**
 * Get first error message for a specific field
 */
export function getFieldErrorMessage(fieldErrors: Record<string, string[]>, fieldName: string): string | undefined {
  return fieldErrors[fieldName]?.[0];
}

/**
 * Build API endpoint with path parameters
 */
export function buildEndpoint(
  endpoint: string | ((params: any) => string),
  params?: Record<string, any>
): string {
  if (typeof endpoint === "function") {
    return endpoint(params);
  }
  return endpoint;
}

/**
 * Build query string from pagination params
 */
export function buildQueryString(params: PaginationParams): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Parse pagination meta from response
 */
export function parsePaginationMeta(response: any) {
  const pagination = response?.pagination || {};
  return {
    page: pagination.page ?? 1,
    limit: pagination.limit ?? 20,
    total: pagination.total ?? 0,
    totalPages: pagination.totalPages ?? 0,
    hasNextPage: pagination.hasNextPage ?? false,
    hasPrevPage: pagination.hasPrevPage ?? false,
  };
}

/**
 * Merge pagination params with defaults
 */
export function mergePaginationDefaults(params: Partial<PaginationParams> = {}) {
  return {
    page: params.page ?? 1,
    limit: params.limit ?? 20,
    ...params,
  };
}

/**
 * Retry API call with exponential backoff
 */
export async function retryApiCall<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelayMs: number = 1000,
  backoffMultiplier: number = 2
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts) {
        const delay = initialDelayMs * Math.pow(backoffMultiplier, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Format API error for user display
 */
export function formatApiErrorForDisplay(error: ApiError | any): string {
  if (typeof error === "string") {
    return error;
  }

  const message = error?.message || error?.error?.message || "An error occurred";
  const code = error?.code || error?.error?.code;

  if (code) {
    return `${message} (${code})`;
  }

  return message;
}

/**
 * Check if error is network related
 */
export function isNetworkError(error: any): boolean {
  return error?.code === "NETWORK_ERROR" || error?.status === 0;
}

/**
 * Check if error is timeout
 */
export function isTimeoutError(error: any): boolean {
  return error?.code === "TIMEOUT" || error?.status === 408;
}

/**
 * Check if error is authentication error
 */
export function isAuthError(error: any): boolean {
  return error?.code === "UNAUTHORIZED" || error?.status === 401;
}

/**
 * Check if error is forbidden
 */
export function isForbiddenError(error: any): boolean {
  return error?.code === "FORBIDDEN" || error?.status === 403;
}

/**
 * Check if error is not found
 */
export function isNotFoundError(error: any): boolean {
  return error?.code === "NOT_FOUND" || error?.status === 404;
}

/**
 * Check if error is validation error
 */
export function isValidationError(error: any): boolean {
  return error?.code === "VALIDATION_ERROR" || error?.status === 422 || error?.status === 400;
}

/**
 * Check if error is server error
 */
export function isServerError(error: any): boolean {
  const status = error?.status;
  return status && status >= 500 && status < 600;
}

/**
 * Check if error is retriable
 */
export function isRetriableError(error: any): boolean {
  return (
    isNetworkError(error) ||
    isTimeoutError(error) ||
    isServerError(error) ||
    error?.status === 429 // Rate limit
  );
}

/**
 * Transform API user response to User type
 */
export function transformApiUser(apiUser: any): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    phone: apiUser.phone || null,
    role: apiUser.role || "user",
    status: apiUser.status || "active",
    createdAt: apiUser.createdAt,
    updatedAt: apiUser.updatedAt,
  };
}

/**
 * Cache API response with TTL
 */
export function createApiCache<T>(ttlMs: number = 5 * 60 * 1000) {
  const cache = new Map<string, { data: T; expiresAt: number }>();

  return {
    get: (key: string): T | null => {
      const cached = cache.get(key);
      if (!cached) return null;

      if (Date.now() > cached.expiresAt) {
        cache.delete(key);
        return null;
      }

      return cached.data;
    },

    set: (key: string, data: T) => {
      cache.set(key, {
        data,
        expiresAt: Date.now() + ttlMs,
      });
    },

    clear: () => cache.clear(),

    remove: (key: string) => cache.delete(key),
  };
}

/**
 * Debounce API call
 */
export function debounceApiCall<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  delayMs: number = 500
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
        timeoutId = null;
      }, delayMs);
    });
  };
}
