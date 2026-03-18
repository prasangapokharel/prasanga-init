/**
 * ============================================================================
 * Prasanga UI - Common Types
 * ============================================================================
 * Shared types used across the application
 * ============================================================================
 */

/**
 * Generic API Response Wrapper
 * Wraps all API responses for consistency
 */
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
};

/**
 * Pagination Metadata
 * Included in paginated responses
 */
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

/**
 * Paginated Response Wrapper
 * Used for list endpoints that support pagination
 */
export type PaginatedResponse<T> = {
  items: T[];
  pagination: PaginationMeta;
};

/**
 * Pagination Query Parameters
 * Sent to list endpoints
 */
export type PaginationParams = {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
};

/**
 * API Error Details
 * Detailed error information from the API
 */
export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  status: number;
};

/**
 * Loading State Union Type
 * Common pattern for async operations
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Async State
 * Generic async operation state management
 */
export type AsyncState<T> = {
  state: LoadingState;
  data?: T;
  error?: ApiError;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

/**
 * Form Field Error
 * Validation error for a single form field
 */
export type FieldError = {
  field: string;
  message: string;
};

/**
 * Form Errors Collection
 * Maps field names to arrays of error messages
 */
export type FormErrors = Record<string, string[]>;

/**
 * Nullable Type Helper
 * Makes a type nullable
 */
export type Nullable<T> = T | null;

/**
 * Optional Type Helper
 * Makes a type optional
 */
export type Optional<T> = T | undefined;

/**
 * Response Envelope for Success
 * Standard success response envelope
 */
export type SuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

/**
 * Response Envelope for Error
 * Standard error response envelope
 */
export type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
};

/**
 * Timestamp Fields
 * Common audit fields included in most entities
 */
export type Timestamps = {
  createdAt: string;
  updatedAt: string;
};

/**
 * Entity with ID
 * Base type for entities with unique identifier
 */
export type Entity<T = {}> = {
  id: string;
} & T & Timestamps;
