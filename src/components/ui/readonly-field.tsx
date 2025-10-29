'use client';

/**
 * Readonly Field Component
 * Reusable readonly input field component for displaying data
 */

import { cn } from '@/lib/utils';
import { Input } from './input';

interface ReadonlyFieldProps {
  label: string;
  value: string | number | null | undefined;
  className?: string;
}

export function ReadonlyField({ label, value, className }: ReadonlyFieldProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Input
        type="text"
        value={value ?? ''}
        readOnly
        className="bg-gray-50 cursor-not-allowed text-gray-900"
      />
    </div>
  );
}

