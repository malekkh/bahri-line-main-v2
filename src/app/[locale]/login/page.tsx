'use client';

/**
 * Login Page
 * User authentication page with email and password
 * Designed to match the Figma design with ship background
 */

import { useLoginLogic } from '@/customhooks/useLoginLogic';
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
import { PasswordInput } from '@/components/ui/password-input';
import { Logo } from '@/components/ui/logo';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export default function LoginPage() {
  const { form, onSubmit, isLoading, error, cookiesAllowed } = useLoginLogic();
  const t = useTranslations('login');

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background Image - Sharp */}
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

      {/* Login Modal */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-[#D4D4D41A] backdrop-blur-lg rounded-lg border border-white/20 p-8 relative">
          {/* Close Button */}
          <button className="absolute top-4 left-4 text-white hover:text-white/80 transition-colors">
            <X className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="light" className='w-[150] h-[38]'/>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-sm text-white">
              {t('subtitle')}
            </p>
          </div>

          {/* Cookie Warning */}
          {cookiesAllowed === false && (
            <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-sm text-yellow-800">
                {t('cookieWarning')}
              </p>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-[325]">
                      {t('username')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('usernamePlaceholder')}
                        className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-[#BB0012]" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-[325]">
                      {t('password')}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t('passwordPlaceholder')}
                        {...field}
                        disabled={isLoading}
                        className='bg-transparent'
                      />
                    </FormControl>
                    <FormMessage className="text-[#BB0012]" />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#FF6720] hover:underline font-medium"
                >
                  {t('forgotPassword')}
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold rounded-md h-11"
                disabled={isLoading}
              >
                {isLoading ? t('signingIn') : t('signIn')}
              </Button>
            </form>
          </Form>

          {/* Account Creation Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white">
              {t('noAccount')}{' '}
              <Link
                href="/register"
                className="font-medium text-[#FF6720] hover:underline"
              >
                {t('createAccount')}
              </Link>
            </p>
          </div>

          {/* Back to Home Button */}
          <Button
            variant="outline"
            className="w-full mt-4 bg-transparent border-white text-white hover:bg-white/10 rounded-md h-11"
          >
            {t('backToHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}

