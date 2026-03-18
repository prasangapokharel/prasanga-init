/**
 * ============================================================================
 * Config Barrel Export
 * ============================================================================
 * Centralized export point for all configuration
 * Use: import { env } from "@/config"
 * ============================================================================
 */

export { env, validateEnvironment, isDevelopment, isProduction, isStaging, logEnvironmentInfo } from "./env";
export type { Environment } from "./env";
