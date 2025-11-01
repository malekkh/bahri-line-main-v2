'use client';

/**
 * Profile Header Component
 * Reusable header component for profile pages with logo, navigation, and user actions
 */

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Settings, User, Globe } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  userImage?: string | null;
  className?: string;
}

export function ProfileHeader({ userImage, className }: ProfileHeaderProps) {
  const [imageError, setImageError] = useState(false);
  const t = useTranslations('profile');
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale as string;
  
  // Get image source - check if it already has data URL prefix
  const getImageSrc = () => {
    if (!userImage) return null;
    if (userImage.startsWith('data:')) {
      return userImage;
    }
    // Default to PNG, but could be detected from base64 header
    return `data:image/png;base64,${userImage}`;
  };
  
  const imageSrc = getImageSrc();
  
  // Toggle language
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  const NavigateToProfilePage = () => {
    if(pathname === `/${locale}/profile`) {
      return;
    }
    router.push(`/profile` as any);
  };

  return (
    <header className={cn('w-full bg-white border-b border-gray-200', className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant="default" />

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}/dashboard/quotation-requests`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.quotationRequests')}
            </Link>
            <Link
              href={`/${locale}/dashboard/offered-quotations`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.offeredQuotations')}
            </Link>
            <Link
              href={`/${locale}/dashboard/credit-applications`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.creditApplications')}
            </Link>
            <Link
              href={`/${locale}/dashboard/contracts`}
              className="text-gray-700 hover:text-[#FF6720] transition-colors font-medium text-sm"
            >
              {t('nav.contracts')}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle Icon */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 group"
              aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
              title={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className="w-5 h-5 text-gray-700 group-hover:text-[#FF6720] transition-colors" />
              <span className="text-xs font-medium text-gray-700 group-hover:text-[#FF6720] transition-colors">
                {locale.toUpperCase()}
              </span>
            </button>
            
            <button
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-gray-700" />
            </button>

            <button
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-[#FF6720] transition-all"
              aria-label="Profile"
              onClick={NavigateToProfilePage}
            >
              {imageSrc && !imageError ? (
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
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

