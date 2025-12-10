'use client';

/**
 * Forgot Password Page
 * User can request a password reset link by entering their email
 */

import { useForgotPasswordLogic } from '@/customhooks/useForgotPasswordLogic';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import { X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export default function ForgotPasswordPage() {
  const { form, onSubmit, isLoading, error, submitted } = useForgotPasswordLogic();
  const t = useTranslations('forgotPassword');
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

      {/* Forgot Password Modal */}
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
              {submitted ? t('checkInbox') : t('title')}
            </h1>
            <p className="text-sm text-white">
              {submitted
                ? t('emailSentMessage')
                : t('subtitle')}
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-100">
                {t('emailSentMessage')}
              </p>
            </div>
          )}

          {/* Error Alert */}
          {error && !submitted && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-100">{error}</p>
            </div>
          )}

          {/* Form */}
          {!submitted && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-[325]">
                        {t('email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('emailPlaceholder')}
                          className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-[#BB0012]" />
                    </FormItem>
                  )}
                />

                {/* Confirm Email Field */}
                <FormField
                  control={form.control}
                  name="confirmEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-[325]">
                        {t('confirmEmail')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('confirmEmailPlaceholder')}
                          className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-[#BB0012]" />
                    </FormItem>
                  )}
                />

                {/* Send Reset Link Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold rounded-md h-11"
                  disabled={isLoading}
                >
                  {isLoading ? t('sending') : t('sendResetLink')}
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


