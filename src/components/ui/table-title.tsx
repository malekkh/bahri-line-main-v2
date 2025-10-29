'use client';

/**
 * Table Title Component
 * Reusable table title component with optional back button
 */

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TableTitleProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

export function TableTitle({ title, showBackButton = false, onBack, className }: TableTitleProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className={cn('flex items-center gap-3 mb-6', className)}>
      {showBackButton && (
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}

