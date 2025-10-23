/**
 * Company CR Number Validation Hook
 * Provides real-time CR number validation for company registration
 * Valid when no existing company is found (CR number is available)
 */

import { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authRequests } from '@/services/requests/req';
import type { CheckCRResponse } from '@/services/api/axiosRoutes.type';

export interface UseCompanyCRValidationReturn {
  isValidating: boolean;
  isValid: boolean | null;
  errorMessage: string | null;
  validateCR: (crNumber: string) => void;
  clearValidation: () => void;
}

export const useCompanyCRValidation = (debounceMs: number = 500): UseCompanyCRValidationReturn => {
  const [crNumber, setCrNumber] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // CR validation mutation
  const validateCRMutation = useMutation({
    mutationFn: (crNumber: string) => authRequests.checkCR(crNumber),
    onSuccess: (response) => {
      const data: CheckCRResponse = response.data;
      
      // Check if any companies were found
      if (data.value && data.value.length > 0) {
        // CR number is already taken by an existing company
        setIsValid(false);
        setErrorMessage('This CR number is already registered to another company');
      } else {
        // CR number is available for registration
        setIsValid(true);
        setErrorMessage(null);
      }
    },
    onError: (error: unknown) => {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to validate CR number');
    },
  });

  // Debounced validation effect
  useEffect(() => {
    if (!crNumber || crNumber.length < 3) {
      setIsValid(null);
      setErrorMessage(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      validateCRMutation.mutate(crNumber);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [crNumber, debounceMs]);

  // Public validation function
  const validateCR = useCallback((crNumber: string) => {
    setCrNumber(crNumber);
  }, []);

  // Clear validation state
  const clearValidation = useCallback(() => {
    setCrNumber('');
    setIsValid(null);
    setErrorMessage(null);
  }, []);

  return {
    isValidating: validateCRMutation.isPending,
    isValid,
    errorMessage,
    validateCR,
    clearValidation,
  };
};
