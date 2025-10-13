/**
 * Global TypeScript Type Definitions
 */

export {};

declare global {
  // Pagination types
  interface PaginationParams {
    page?: number;
    limit?: number;
  }

  interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }

  // API Response types
  interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
  }

  interface ApiError {
    message: string;
    code?: string;
    status?: number;
  }
}

