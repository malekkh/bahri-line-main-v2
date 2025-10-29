'use client';

/**
 * Profile Header Component
 * Reusable header component for profile pages with logo, navigation, and user actions
 */

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Settings, User } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  userImage?: string | null;
  className?: string;
}

export function ProfileHeader({ userImage, className }: ProfileHeaderProps) {
  const t = useTranslations('profile');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <header className={cn('w-full bg-white border-b border-gray-200', className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant="default" />

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}/quotation-requests`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.quotationRequests')}
            </Link>
            <Link
              href={`/${locale}/offered-quotations`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.offeredQuotations')}
            </Link>
            <Link
              href={`/${locale}/credit-applications`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.creditApplications')}
            </Link>
            <Link
              href={`/${locale}/contracts`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.contracts')}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            
            <button
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-gray-700" />
            </button>

            <button
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-[#FF6720] transition-all"
              aria-label="Profile"
            >
              {userImage ? (
                <img
                  src={`data:image/png;base64,${userImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

