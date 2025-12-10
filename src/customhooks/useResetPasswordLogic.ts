'use client';

/**
 * Reset Password Logic Hook
 * Custom hook for reset password page - handles form validation with RHF + Zod and API calls
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/auth.schema';
import { authRequests } from '@/services/requests/req';
import { authResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';
import { fetchPublicKey, encryptPasswordWithKey } from '@/utils/hashPassword';

export const useResetPasswordLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  // Get requestId from URL query params
  useEffect(() => {
    const id = searchParams.get('id');
    const req = searchParams.get('req');

    if (id) {
      setRequestId(id);
    } else {
      // If no id param, try to get from 'req' param (alternative format)
      if (req) {
        setRequestId(req);
      }
    }
  }, [searchParams]);

  // React Hook Form with Zod validation
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordFormData) => {
      if (!requestId) {
        throw new Error('Invalid reset link. Missing request ID.');
      }

      // Step 1: Fetch public key from server
      const publicKeyPem = await fetchPublicKey();

      // Step 2: Encrypt password using RSA-OAEP
      const encryptedPassword = encryptPasswordWithKey(data.password, publicKeyPem);

      // Step 3: Send reset password request
      const response = await authRequests.resetPassword({
        requestId,
        newPassword: encryptedPassword,
      });

      return authResponses.processMessage(response);
    },
    onSuccess: () => {
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    },
    onError: (error) => {
      const apiError = handleApiError(error);

      // Set form error
      form.setError('root', {
        type: 'manual',
        message: apiError.message,
      });
    },
  });

  // Submit handler
  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: resetPasswordMutation.isPending,
    error: form.formState.errors.root?.message,
    success,
    requestId,
  };
};

export default useResetPasswordLogic;

