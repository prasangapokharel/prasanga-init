/**
 * ============================================================================
 * Hooks Barrel Export
 * ============================================================================
 * Centralized export point for all custom hooks
 * Use: import { useApi, useValidation, usePagination } from "@/hooks"
 * ============================================================================
 */

export { useApi, useApiPaginated } from "./useApi";
export { useValidation, validators } from "./useValidation";
export type { ValidationRule, FormValues } from "./useValidation";

export { usePagination, useInfinitePagination } from "./usePagination";
export type { PaginationState } from "./usePagination";
