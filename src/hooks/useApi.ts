/**
 * ============================================================================
 * useApi - Custom Hook for API Calls
 * ============================================================================
 * Wrapper around API calls with automatic loading, error, and data state management
 * Reduces boilerplate in components when making API requests
 * ============================================================================
 */

import { useEffect, useState, useCallback } from "react";
import { apiService } from "../services/api";
import type { ApiResponse, ApiError, AsyncState, LoadingState } from "../types";

/**
 * useApi Hook Options
 */
interface UseApiOptions {
  /** Whether to fetch automatically on mount */
  autoFetch?: boolean;
  /** Called when data is successfully fetched */
  onSuccess?: (data: any) => void;
  /** Called when an error occurs */
  onError?: (error: ApiError) => void;
  /** Called when loading state changes */
  onLoadingChange?: (isLoading: boolean) => void;
}

/**
 * useApi Hook Return Type
 */
interface UseApiReturn<T> extends AsyncState<T> {
  refetch: () => Promise<void>;
  setData: (data: T) => void;
  clearError: () => void;
}

/**
 * Hook for making API calls with state management
 * @param fn - Async function that returns ApiResponse<T>
 * @param options - Hook configuration options
 * @returns Object containing state and methods
 */
export function useApi<T>(
  fn: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const { autoFetch = true, onSuccess, onError, onLoadingChange } = options;

  const [state, setState] = useState<LoadingState>("idle");
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<ApiError | undefined>();

  /**
   * Execute the API call
   */
  const execute = useCallback(async () => {
    try {
      setState("loading");
      onLoadingChange?.(true);

      const response = await fn();

      if (response.success && response.data) {
        setData(response.data);
        setError(undefined);
        setState("success");
        onSuccess?.(response.data);
      } else {
        const apiError: ApiError = {
          code: response.error?.code || "UNKNOWN_ERROR",
          message: response.error?.message || "Unknown error",
          status: 0,
          details: response.error?.details,
        };
        setError(apiError);
        setState("error");
        onError?.(apiError);
      }
    } catch (err) {
      const apiError =
        err instanceof Object && "code" in err && "message" in err
          ? (err as ApiError)
          : {
              code: "UNKNOWN_ERROR",
              message: err instanceof Error ? err.message : "Unknown error",
              status: 0,
            };

      setError(apiError);
      setState("error");
      onError?.(apiError);
    } finally {
      onLoadingChange?.(false);
    }
  }, [fn, onSuccess, onError, onLoadingChange]);

  /**
   * Auto-fetch on mount if enabled
   */
  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, [autoFetch, execute]);

  /**
   * Refetch the data
   */
  const refetch = useCallback(async () => {
    await execute();
  }, [execute]);

  /**
   * Update data manually
   */
  const updateData = useCallback((newData: T) => {
    setData(newData);
  }, []);

  /**
   * Clear error state
   */
  const clearErrorState = useCallback(() => {
    setError(undefined);
  }, []);

  return {
    state,
    data,
    error,
    isLoading: state === "loading",
    isError: state === "error",
    isSuccess: state === "success",
    refetch,
    setData: updateData,
    clearError: clearErrorState,
  };
}

/**
 * Hook for paginated API calls
 */
export function useApiPaginated<T>(
  fn: (page: number, limit: number) => Promise<ApiResponse<{ items: T[]; total: number }>>,
  initialPage: number = 1,
  initialLimit: number = 20
) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const apiCall = useCallback(async (): Promise<ApiResponse<T[]>> => {
    const response = await fn(page, limit);
    if (response.success && response.data) {
      setTotal(response.data.total);
      return {
        ...response,
        data: response.data.items,
      };
    }
    return response as any;
  }, [fn, page, limit]);

  const baseReturn = useApi<T[]>(apiCall);

  const totalPages = Math.ceil(total / limit);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage((p) => p + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  return {
    ...baseReturn,
    page,
    limit,
    total,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
}

export default useApi;
