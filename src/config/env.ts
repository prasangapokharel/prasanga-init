/**
 * ============================================================================
 * Environment Configuration - Type-Safe Access to .env Variables
 * ============================================================================
 * Centralized access to all environment variables with type safety and defaults
 * Use: import { env } from "@/config"
 * ============================================================================
 */

/**
 * Validate and return environment variable with type safety
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    console.warn(`Environment variable ${key} is not defined`);
    return "";
  }
  return value || defaultValue || "";
}

/**
 * Environment Configuration Object
 * Type-safe access to all .env variables
 */
export const env = {
  // App Configuration
  APP_VERSION: getEnvVar("EXPO_PUBLIC_APP_VERSION", "1.3.1"),
  APP_NAME: getEnvVar("EXPO_PUBLIC_APP_NAME", "Prasanga UI"),
  APP_ENVIRONMENT: getEnvVar("EXPO_PUBLIC_ENVIRONMENT", "development"),

  // API Configuration
  API_BASE_URL: getEnvVar("EXPO_PUBLIC_API_BASE_URL", "http://localhost:3000/api"),
  API_TIMEOUT: parseInt(getEnvVar("EXPO_PUBLIC_API_TIMEOUT", "30000")),
  API_RETRY_ATTEMPTS: parseInt(getEnvVar("EXPO_PUBLIC_API_RETRY_ATTEMPTS", "3")),

  // Theme Configuration
  THEME_DEFAULT: getEnvVar("EXPO_PUBLIC_THEME_DEFAULT", "light"),
  THEME_PERSISTENCE: getEnvVar("EXPO_PUBLIC_THEME_PERSISTENCE", "true") === "true",

  // Component Configuration
  TOAST_DURATION: parseInt(getEnvVar("EXPO_PUBLIC_TOAST_DURATION", "3000")),
  MODAL_OVERLAY_OPACITY: parseFloat(getEnvVar("EXPO_PUBLIC_MODAL_OVERLAY_OPACITY", "0.5")),
  DRAWER_ANIMATION_DURATION: parseInt(
    getEnvVar("EXPO_PUBLIC_DRAWER_ANIMATION_DURATION", "400")
  ),

  // Feature Flags
  ENABLE_LOGGING: getEnvVar("EXPO_PUBLIC_ENABLE_LOGGING", "true") === "true",
  ENABLE_ANALYTICS: getEnvVar("EXPO_PUBLIC_ENABLE_ANALYTICS", "false") === "true",
  ENABLE_CRASH_REPORTING: getEnvVar("EXPO_PUBLIC_ENABLE_CRASH_REPORTING", "false") === "true",

  // Security
  API_KEY: getEnvVar("EXPO_PUBLIC_API_KEY"),
  API_SECRET: getEnvVar("EXPO_SECRET_API_SECRET"),

  // External Services
  SENTRY_DSN: getEnvVar("EXPO_PUBLIC_SENTRY_DSN"),
  ANALYTICS_TRACKING_ID: getEnvVar("EXPO_PUBLIC_ANALYTICS_TRACKING_ID"),

  // Database
  DB_URL: getEnvVar("EXPO_SECRET_DB_URL"),
} as const;

/**
 * Type for environment variables
 */
export type Environment = typeof env;

/**
 * Validate that all required environment variables are set
 */
export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required variables (add as needed)
  const requiredVars: (keyof typeof env)[] = [];

  requiredVars.forEach((varName) => {
    if (!env[varName]) {
      errors.push(`Required environment variable ${varName} is not set`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if running in development environment
 */
export const isDevelopment = (): boolean => {
  return env.APP_ENVIRONMENT === "development";
};

/**
 * Check if running in production environment
 */
export const isProduction = (): boolean => {
  return env.APP_ENVIRONMENT === "production";
};

/**
 * Check if running in staging environment
 */
export const isStaging = (): boolean => {
  return env.APP_ENVIRONMENT === "staging";
};

/**
 * Log environment status (only in development)
 */
export function logEnvironmentInfo(): void {
  if (isDevelopment()) {
    console.log("=== Environment Configuration ===");
    console.log("App:", env.APP_NAME, `v${env.APP_VERSION}`);
    console.log("Environment:", env.APP_ENVIRONMENT);
    console.log("API Base URL:", env.API_BASE_URL);
    console.log("API Timeout:", env.API_TIMEOUT, "ms");
    console.log("API Retry Attempts:", env.API_RETRY_ATTEMPTS);
    console.log("Theme Default:", env.THEME_DEFAULT);
    console.log("Logging Enabled:", env.ENABLE_LOGGING);
    console.log("==================================");
  }
}

export default env;
