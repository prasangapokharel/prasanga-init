/**
 * ============================================================================
 * Constants - Centralized application constants
 * ============================================================================
 * Use this file for all hardcoded values, configuration constants, and enums
 * Benefits: Single source of truth, easy to update, type-safe
 */

// App Metadata
export const APP_CONFIG = {
  NAME: "Prasanga UI",
  VERSION: "1.3.1",
  BUILD: "1",
  AUTHOR: "Prasanga Team",
  DESCRIPTION: "Premium React Native Component Library",
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || "30000"),
  RETRY_ATTEMPTS: parseInt(process.env.EXPO_PUBLIC_API_RETRY_ATTEMPTS || "3"),
  RETRY_DELAY: 1000,
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT: process.env.EXPO_PUBLIC_THEME_DEFAULT || "light",
  PERSISTENCE_KEY: "@prasanga_theme",
  ENABLE_PERSISTENCE: process.env.EXPO_PUBLIC_THEME_PERSISTENCE === "true",
} as const;

// Component Defaults
export const COMPONENT_DEFAULTS = {
  TOAST_DURATION: parseInt(process.env.EXPO_PUBLIC_TOAST_DURATION || "3000"),
  MODAL_OVERLAY_OPACITY: parseFloat(process.env.EXPO_PUBLIC_MODAL_OVERLAY_OPACITY || "0.5"),
  DRAWER_ANIMATION_DURATION: parseInt(process.env.EXPO_PUBLIC_DRAWER_ANIMATION_DURATION || "400"),
  BUTTON_ACTIVE_OPACITY: 0.7,
  INPUT_PLACEHOLDER_OPACITY: 0.5,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  PHONE_PATTERN: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  PAGE_SIZES: [10, 20, 50, 100] as const,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network connection failed. Please try again.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  VALIDATION_ERROR: "Validation failed. Please check your input.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "Resource not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unknown error occurred.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: "Successfully created.",
  UPDATED: "Successfully updated.",
  DELETED: "Successfully deleted.",
  SAVED: "Changes saved successfully.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",
} as const;

// Status Enums
export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
} as const;

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
} as const;

// Animation Durations (ms)
export const ANIMATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Breakpoints (device sizes in pixels)
export const BREAKPOINTS = {
  SMALL: 480,      // Mobile phones
  MEDIUM: 768,     // Tablets
  LARGE: 1024,     // Desktops
  EXTRA_LARGE: 1440, // Large screens
} as const;

// Spacing Scale (multiples of 4px)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

// Border Radius
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  FULL: 9999,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  HIDDEN: -1,
  BASE: 0,
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;

export default {
  APP_CONFIG,
  API_CONFIG,
  THEME_CONFIG,
  COMPONENT_DEFAULTS,
  VALIDATION_RULES,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  USER_STATUS,
  USER_ROLES,
  ANIMATIONS,
  BREAKPOINTS,
  SPACING,
  BORDER_RADIUS,
  Z_INDEX,
};
