'use client';

/**
 * Status Badge Component
 * Reusable status badge component with dynamic colors based on status
 */

import { cn } from '@/lib/utils';

export type StatusType = 'in_progress' | 'not_started' | 'completed' | 'in' | 'n' | 'c' | string;

interface StatusBadgeProps {
  status: StatusType | { value: number; label: string };
  className?: string;
}

// Map status values/labels to colors
const getStatusColor = (status: StatusType | { value: number; label: string }): string => {
  let statusValue: string;
  
  if (typeof status === 'object' && status.label) {
    statusValue = status.label.toLowerCase();
  } else {
    statusValue = String(status).toLowerCase();
  }

  // Normalize status values
  const normalizedStatus = statusValue.trim().toLowerCase();

  if (normalizedStatus === 'in progress' || normalizedStatus === 'in' || normalizedStatus === 'inprogress') {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  }
  
  if (normalizedStatus === 'not started' || normalizedStatus === 'n' || normalizedStatus === 'notstarted') {
    return 'bg-red-100 text-red-800 border-red-200';
  }
  
  if (normalizedStatus === 'completed' || normalizedStatus === 'c' || normalizedStatus === 'complete') {
    return 'bg-green-100 text-green-800 border-green-200';
  }

  // Default color for unknown statuses
  return 'bg-gray-100 text-gray-800 border-gray-200';
};

const getStatusLabel = (status: StatusType | { value: number; label: string }): string => {
  if (typeof status === 'object' && status.label) {
    return status.label;
  }
  return String(status);
};

export function StatusBadge({ status,  className }: StatusBadgeProps) {
  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-xs font-medium border w-[180px]',
        colorClass,
        className
      )}
    >
      {label}
      
    </span>
  );
}

