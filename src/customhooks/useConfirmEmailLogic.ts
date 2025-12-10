'use client';

/**
 * Confirm Email Logic Hook
 * Custom hook for confirm email page - handles email confirmation API call
 */

import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authRequests } from '@/services/requests/req';
import { authResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';

export const useConfirmEmailLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [requestId, setRequestId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Get requestId from URL query params
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setRequestId(id);
    } else {
      setMessage('Missing confirmation ID.');
    }
  }, [searchParams]);

  // Confirm email mutation
  const confirmEmailMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await authRequests.confirmEmail(id);
      return authResponses.processConfirmEmail(response);
    },
    onSuccess: (data) => {
      if (data.success) {
        setMessage('Email confirmed successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setMessage(data.message || 'Email confirmation failed.');
      }
    },
    onError: (error) => {
      const apiError = handleApiError(error);
      setMessage(apiError.message);
    },
  });

  // Confirm handler
  const handleConfirm = () => {
    if (requestId) {
      confirmEmailMutation.mutate(requestId);
    } else {
      setMessage('Missing confirmation ID.');
    }
  };

  const isSuccess = message?.includes('successfully');
  const isLoading = confirmEmailMutation.isPending;

  return {
    handleConfirm,
    isLoading,
    message,
    isSuccess,
    requestId,
  };
};

export default useConfirmEmailLogic;


