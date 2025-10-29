'use client';

/**
 * Profile Banner Component
 * Reusable banner component showing user profile information
 */

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileBannerProps {
  userImage?: string | null;
  firstName: string;
  lastName: string;
  companyName?: string;
  onEdit?: () => void;
  className?: string;
}

export function ProfileBanner({
  userImage,
  firstName,
  lastName,
  companyName,
  onEdit,
  className,
}: ProfileBannerProps) {
  const [imageError, setImageError] = useState(false);
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  const fullName = `${firstName} ${lastName}`;
  
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

  return (
    <div
      className={cn(
        'relative bg-[#003C71] overflow-hidden',
        className
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Profile Banner Shape SVG Background */}
      <div
        className={cn(
          'absolute top-0 bottom-0  pointer-events-none',
          isRTL ? 'left-[-40px]' : 'right-0'
        )}
      >
        <div className={cn(
          'h-full flex items-center',
          isRTL ? 'justify-start pl-8' : 'justify-end'
        )}>
          <Image
            src="/images/profilebannershape.svg"
            alt=""
            width={305}
            height={130}
            className={cn(
              'w-auto h-auto max-w-full max-h-full object-contain',
              isRTL ? 'scale-x-[-1]' : ''
            )}
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-6">
          {/* Profile Picture */}
          <div className={cn(
            'relative',
            isRTL ? 'order-1' : 'order-2'
          )}>
            <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-4 border-white shadow-lg">
              {imageSrc && !imageError ? (
                <img
                  src={imageSrc}
                  alt={fullName}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-2xl font-bold">
                    {firstName.charAt(0)}{lastName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Edit Icon */}
            {onEdit && (
              <button
                onClick={onEdit}
                className={cn(
                  'absolute -bottom-1 w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors',
                  // In RTL, edit icon on left side (when profile is on right)
                  // In LTR, edit icon on right side (when profile is on left)
                  isRTL ? '-left-1' : '-right-1'
                )}
                aria-label="Edit profile"
              >
                <Edit2 className="w-4 h-4 text-gray-700" />
              </button>
            )}
          </div>

          {/* User Info */}
          <div className={cn(
            'flex-1',
            isRTL ? 'order-1 text-right' : 'order-2 text-left'
          )}>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {fullName}
            </h1>
            {companyName && (
              <p className="text-white/90 text-sm md:text-base">
                {companyName}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

