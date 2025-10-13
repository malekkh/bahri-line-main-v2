'use client';

/**
 * Login Logic Hook
 * Custom hook for login page - handles form validation with RHF + Zod and API calls
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import { authRequests } from '@/services/requests/req';
import { authResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';
import { fetchPublicKey, encryptPasswordWithKey } from '@/utils/hashPassword';
import { areCookiesEnabled } from '@/utils/cookieDetection';

export const useLoginLogic = () => {
  const router = useRouter();
  const [cookiesAllowed, setCookiesAllowed] = useState<boolean | null>(null);

  // Check cookie status on mount
  useEffect(() => {
    const checkCookies = () => {
      const enabled = areCookiesEnabled();
      setCookiesAllowed(enabled);
    };
    
    checkCookies();
  }, []);

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
      // Check if cookies are enabled
      if (cookiesAllowed === false) {
        throw new Error('Third-party cookies are blocked. Please enable them to proceed.');
      }

      // Step 1: Fetch public key from server
      const publicKeyPem = await fetchPublicKey();
      
      // Step 2: Encrypt password using RSA-OAEP
      const encryptedPassword = encryptPasswordWithKey(data.password, publicKeyPem);
      
      // Step 3: Send login request with encrypted password
      const response = await authRequests.login({
        email: data.email,
        encryptedPassword,
      });
      
      return authResponses.processLogin(response);
    },
    onSuccess: (data) => {
      // Backend uses session cookies, no need to store token manually
      // The session cookie is automatically set by the backend
      
      if (data.success) {
        // Redirect to dashboard or desired page
        const redirectPath = '/dashboard'; // You can make this dynamic
        router.push(redirectPath);
        router.refresh(); // Refresh to update auth state
      } else {
        // Handle unsuccessful login
        form.setError('root', {
          type: 'manual',
          message: data.message || 'Login failed',
        });
      }
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
    cookiesAllowed,
  };
};

export default useLoginLogic;

