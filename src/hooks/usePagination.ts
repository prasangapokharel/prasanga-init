/**
 * ============================================================================
 * usePagination - Custom Hook for Pagination State Management
 * ============================================================================
 * Manages pagination state (page, limit, total, etc.)
 * Can be used independently or with useApi for data fetching
 * ============================================================================
 */

import { useState, useCallback } from "react";
import { PAGINATION } from "../../constants";

/**
 * Pagination State
 */
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * usePagination Hook Options
 */
interface UsePaginationOptions {
  /** Initial page number */
  initialPage?: number;
  /** Initial items per page */
  initialLimit?: number;
  /** Total number of items */
  total?: number;
  /** Called when page changes */
  onPageChange?: (page: number) => void;
  /** Called when limit changes */
  onLimitChange?: (limit: number) => void;
}

/**
 * usePagination Hook Return Type
 */
interface UsePaginationReturn extends PaginationState {
  /** Go to next page */
  nextPage: () => void;
  /** Go to previous page */
  prevPage: () => void;
  /** Go to specific page */
  goToPage: (page: number) => void;
  /** Change items per page */
  setLimit: (limit: number) => void;
  /** Set total number of items */
  setTotal: (total: number) => void;
  /** Reset to initial state */
  reset: () => void;
  /** Get items for current page */
  getOffset: () => number;
}

/**
 * Hook for pagination state management
 * @param options - Hook configuration options
 * @returns Object containing pagination state and methods
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const {
    initialPage = PAGINATION.DEFAULT_PAGE,
    initialLimit = PAGINATION.DEFAULT_LIMIT,
    total: initialTotal = 0,
    onPageChange,
    onLimitChange,
  } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(Math.min(initialLimit, PAGINATION.MAX_LIMIT));
  const [total, setTotalState] = useState(initialTotal);

  // Calculate derived values
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      const newPage = page + 1;
      setPage(newPage);
      onPageChange?.(newPage);
    }
  }, [page, hasNextPage, onPageChange]);

  /**
   * Go to previous page
   */
  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange?.(newPage);
    }
  }, [page, hasPrevPage, onPageChange]);

  /**
   * Go to specific page
   */
  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
        onPageChange?.(newPage);
      }
    },
    [totalPages, onPageChange]
  );

  /**
   * Change items per page
   */
  const updateLimit = useCallback(
    (newLimit: number) => {
      const clampedLimit = Math.min(Math.max(1, newLimit), PAGINATION.MAX_LIMIT);
      setLimitState(clampedLimit);
      // Reset to first page when limit changes
      setPage(1);
      onLimitChange?.(clampedLimit);
      onPageChange?.(1);
    },
    [onLimitChange, onPageChange]
  );

  /**
   * Set total items count
   */
  const updateTotal = useCallback((newTotal: number) => {
    const clampedTotal = Math.max(0, newTotal);
    setTotalState(clampedTotal);
    // Reset to first page if current page is beyond new total pages
    const newTotalPages = Math.max(1, Math.ceil(clampedTotal / limit));
    if (page > newTotalPages) {
      setPage(1);
      onPageChange?.(1);
    }
  }, [limit, page, onPageChange]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setPage(initialPage);
    setLimitState(initialLimit);
    setTotalState(initialTotal);
    onPageChange?.(initialPage);
  }, [initialPage, initialLimit, initialTotal, onPageChange]);

  /**
   * Get offset for API queries (0-indexed)
   */
  const getOffset = useCallback(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
    setLimit: updateLimit,
    setTotal: updateTotal,
    reset,
    getOffset,
  };
}

/**
 * Hook for infinite scroll pagination (load more pattern)
 */
export function useInfinitePagination(options: UsePaginationOptions = {}) {
  const {
    initialPage = PAGINATION.DEFAULT_PAGE,
    initialLimit = PAGINATION.DEFAULT_LIMIT,
    total: initialTotal = 0,
    onPageChange,
    onLimitChange,
  } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
  const [total, setTotalState] = useState(initialTotal);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canLoadMore = page < totalPages;

  /**
   * Load next batch of items
   */
  const loadMore = useCallback(() => {
    if (canLoadMore) {
      const newPage = page + 1;
      setPage(newPage);
      onPageChange?.(newPage);
    }
  }, [page, canLoadMore, onPageChange]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setPage(initialPage);
    setLimitState(initialLimit);
    setTotalState(initialTotal);
  }, [initialPage, initialLimit, initialTotal]);

  return {
    page,
    limit,
    total,
    totalPages,
    canLoadMore,
    loadMore,
    setTotal: (newTotal: number) => setTotalState(newTotal),
    reset,
    getOffset: () => (page - 1) * limit,
  };
}

export default usePagination;
