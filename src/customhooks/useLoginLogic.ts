'use client';

/**
 * Login Logic Hook
 * Custom hook for login page - handles form validation with RHF + Zod and API calls
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import { authRequests } from '@/services/requests/req';
import { authResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';
import { AUTH_TOKEN_KEY } from '@/config/constants';

export const useLoginLogic = () => {
  const router = useRouter();

  // React Hook Form with Zod validation
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await authRequests.login(data);
      return authResponses.processLogin(response);
    },
    onSuccess: (data) => {
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      }

      // Redirect to dashboard or home
      router.push('/dashboard');
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
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
    error: form.formState.errors.root?.message,
  };
};

export default useLoginLogic;

