/**
 * ============================================================================
 * Utils Barrel Export
 * ============================================================================
 * Centralized export point for all utility functions
 * Use: import { isValidEmail, formatCurrency } from "@/utils"
 * ============================================================================
 */

// Validation utilities
export {
  isValidEmail,
  isValidPassword,
  getPasswordStrength,
  getPasswordStrengthLabel,
  isValidPhone,
  isValidUrl,
  isEmpty,
  isValidNumber,
  isValidInteger,
  isValidCreditCard,
  isValidDate,
  isValidAge,
  isValidUsername,
  isValidColor,
  sanitizeEmail,
  sanitizeInput,
  areAllFieldsFilled,
  getValidationErrorMessage,
} from "./validation";

// Formatting utilities
export {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatBytes,
  formatDate,
  formatDateTime,
  formatTime,
  formatDuration,
  formatRelativeTime,
  formatPhone,
  formatCreditCard,
  formatEmail,
  truncate,
  capitalize,
  titleCase,
  camelToSpace,
  snakeToSpace,
  slugify,
  formatJSON,
  formatBoolean,
  formatList,
  formatObject,
} from "./formatting";

// API helper utilities
export {
  isApiSuccess,
  isApiError,
  getApiErrorMessage,
  getApiFieldErrors,
  getFieldErrorMessage,
  buildEndpoint,
  buildQueryString,
  parsePaginationMeta,
  mergePaginationDefaults,
  retryApiCall,
  formatApiErrorForDisplay,
  isNetworkError,
  isTimeoutError,
  isAuthError,
  isForbiddenError,
  isNotFoundError,
  isValidationError,
  isServerError,
  isRetriableError,
  transformApiUser,
  createApiCache,
  debounceApiCall,
} from "./api-helpers";
