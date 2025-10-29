'use client';

/**
 * Profile Banner Component
 * Reusable banner component showing user profile information
 */

'use client';

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
  const fullName = `${firstName} ${lastName}`;

  return (
    <div
      className={cn(
        'relative bg-[#003C71] overflow-hidden',
        className
      )}
    >
      {/* Ship Illustration Background */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
        <div className="h-full flex items-center justify-end pr-8">
          {/* Ship outline illustration */}
          <svg
            width="200"
            height="150"
            viewBox="0 0 200 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-auto"
          >
            {/* Ship hull */}
            <path
              d="M30 100 L70 120 L170 120 L200 100 L170 80 L30 80 Z"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Mast structures */}
            <path
              d="M50 80 L50 55 L60 55 L60 80"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M75 80 L75 60 L85 60 L85 80"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M100 80 L100 65 L110 65 L110 80"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M125 80 L125 70 L135 70 L135 80"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-4 border-white shadow-lg">
              {userImage ? (
                <img
                  src={`data:image/png;base64,${userImage}`}
                  alt={fullName}
                  className="w-full h-full object-cover"
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
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Edit profile"
              >
                <Edit2 className="w-4 h-4 text-gray-700" />
              </button>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
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

