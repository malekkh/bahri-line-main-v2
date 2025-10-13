/**
 * API Error Handler Utility
 * Centralized error handling for API requests
 */

import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

/**
 * Handle API errors and return a standardized error message
 */
export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (error instanceof AxiosError) {
    const response = error.response;

    if (response?.data) {
      return {
        message: response.data.message || 'An error occurred',
        code: response.data.code,
        status: response.status,
        errors: response.data.errors,
      };
    }

    if (error.request) {
      return {
        message: 'Network error - no response received',
        code: 'NETWORK_ERROR',
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'ERROR',
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  const apiError = handleApiError(error);
  return apiError.message;
};

export default handleApiError;

