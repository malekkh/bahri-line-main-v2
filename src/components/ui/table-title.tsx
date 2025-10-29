'use client';

/**
 * Table Title Component
 * Reusable table title component with optional back button
 */

import { ChevronLeft } from 'lucide-react';
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
          className="flex items-center justify-center p-0 hover:opacity-80 transition-opacity"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}

