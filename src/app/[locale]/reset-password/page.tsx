'use client';

/**
 * Reset Password Page
 * User can reset their password using a reset link from their email
 */

import { useResetPasswordLogic } from '@/customhooks/useResetPasswordLogic';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { Logo } from '@/components/ui/logo';
import { X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export default function ResetPasswordPage() {
  const { form, onSubmit, isLoading, error, success, requestId } = useResetPasswordLogic();
  const t = useTranslations('resetPassword');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ship.webp"
          alt="Bahri Line Ship"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#00000080]" />
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Reset Password Modal */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-[#D4D4D41A] backdrop-blur-lg rounded-lg border border-white/20 p-8 relative">
          {/* Close Button */}
          <button 
            className="absolute top-4 left-4 text-white hover:text-white/80 transition-colors"
            onClick={() => router.push('/')}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="light" className='w-[150] h-[38]'/>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-sm text-white">
              {t('subtitle')}
            </p>
          </div>

          {/* Invalid Link Error */}
          {!requestId && !success && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-100">
                {t('invalidLink')}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-100">
                {t('successMessage')}
              </p>
            </div>
          )}

          {/* Error Alert */}
          {error && !success && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-100">{error}</p>
            </div>
          )}

          {/* Form */}
          {!success && requestId && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-[325]">
                        {t('newPassword')}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t('newPasswordPlaceholder')}
                          className="bg-transparent"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-[#BB0012]" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-[325]">
                        {t('confirmPassword')}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t('confirmPasswordPlaceholder')}
                          className="bg-transparent"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-[#BB0012]" />
                    </FormItem>
                  )}
                />

                {/* Update Password Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold rounded-md h-11"
                  disabled={isLoading}
                >
                  {isLoading ? t('updating') : t('updatePassword')}
                </Button>
              </form>
            </Form>
          )}

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white">
              {t('rememberPassword')}{' '}
              <Link
                href={`/${locale}/login`}
                className="font-medium text-[#FF6720] hover:underline"
              >
                {t('logIn')}
              </Link>
            </p>
          </div>

          {/* Back to Home Button */}
          <Button
            variant="outline"
            className="w-full mt-4 bg-transparent border-white text-white hover:bg-white/10 rounded-md h-11"
            onClick={() => router.push('/')}
          >
            {t('backToHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}


