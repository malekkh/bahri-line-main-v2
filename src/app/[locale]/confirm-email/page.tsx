'use client';

/**
 * Confirm Email Page
 * User confirms their email address using a confirmation link from their email
 */

import { useConfirmEmailLogic } from '@/customhooks/useConfirmEmailLogic';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export default function ConfirmEmailPage() {
  const { handleConfirm, isLoading, message, isSuccess, requestId } = useConfirmEmailLogic();
  const t = useTranslations('confirmEmail');
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

      {/* Confirm Email Modal */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-[#D4D4D41A] backdrop-blur-lg rounded-lg border border-white/20 p-8 relative">
          {/* Close Button */}
          <button 
            className="absolute top-4 left-4 text-white hover:text-white/80 transition-colors"
            onClick={() => router.push('/')}
          >
            <XCircle className="h-5 w-5" />
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

          {/* Message Display */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                isSuccess
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 text-white animate-spin flex-shrink-0 mt-0.5" />
              ) : isSuccess ? (
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  isSuccess ? 'text-green-100' : 'text-red-100'
                }`}
              >
                {message}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          {!message && requestId && (
            <div className="space-y-4">
              <Button
                onClick={handleConfirm}
                className="w-full bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold rounded-md h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('confirming')}
                  </>
                ) : (
                  t('confirmEmail')
                )}
              </Button>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/login`}
              className="text-sm font-medium text-[#FF6720] hover:underline"
            >
              {t('backToLogin')}
            </Link>
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


