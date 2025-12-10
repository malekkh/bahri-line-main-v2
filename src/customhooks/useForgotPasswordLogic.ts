'use client';

/**
 * Forgot Password Logic Hook
 * Custom hook for forgot password page - handles form validation with RHF + Zod and API calls
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/schemas/auth.schema';
import { authRequests } from '@/services/requests/req';
import { authResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';

export const useForgotPasswordLogic = () => {
  const [submitted, setSubmitted] = useState(false);

  // React Hook Form with Zod validation
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      confirmEmail: '',
    },
  });

  // Forgot password mutation - checks contact existence, which triggers email sending
  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordFormData) => {
      // Check if contact exists - this also triggers sending the reset email if contact exists
      const checkResponse = await authRequests.checkContactExistence(data.email);
      const checkResult = authResponses.processCheckContactExistence(checkResponse);

      if (!checkResult.success) {
        throw new Error(checkResult.message || 'Email not found');
      }

      // Return success - email has been sent
      return { success: true, message: checkResult.message || 'Password reset link sent to your email' };
    },
    onSuccess: () => {
      setSubmitted(true);
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
  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: forgotPasswordMutation.isPending,
    error: form.formState.errors.root?.message,
    submitted,
  };
};

export default useForgotPasswordLogic;

