/**
 * CR Number Validation Hook
 * Provides real-time CR number validation with debouncing
 */

import { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authRequests } from '@/services/requests/req';
import type { CheckCRResponse } from '@/services/api/axiosRoutes.type';

export interface UseCRValidationReturn {
  isValidating: boolean;
  isValid: boolean | null;
  errorMessage: string | null;
  companyInfo: CheckCRResponse['value'][0] | null;
  validateCR: (crNumber: string) => void;
  clearValidation: () => void;
}

export const useCRValidation = (debounceMs: number = 500): UseCRValidationReturn => {
  const [crNumber, setCrNumber] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CheckCRResponse['value'][0] | null>(null);

  // CR validation mutation
  const validateCRMutation = useMutation({
    mutationFn: (crNumber: string) => authRequests.checkCR(crNumber),
    onSuccess: (response) => {
      const data: CheckCRResponse = response.data;
      
      // Check if any companies were found
      if (data.value && data.value.length > 0) {
        setIsValid(true);
        setErrorMessage(null);
        setCompanyInfo(data.value[0]); // Use the first company found
      } else {
        setIsValid(false);
        setErrorMessage('No company found with this CR number');
        setCompanyInfo(null);
      }
    },
    onError: (error: unknown) => {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to validate CR number');
      setCompanyInfo(null);
    },
  });

  // Debounced validation effect
  useEffect(() => {
    if (!crNumber || crNumber.length < 3) {
      setIsValid(null);
      setErrorMessage(null);
      setCompanyInfo(null);
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
    setCompanyInfo(null);
  }, []);

  return {
    isValidating: validateCRMutation.isPending,
    isValid,
    errorMessage,
    companyInfo,
    validateCR,
    clearValidation,
  };
};
