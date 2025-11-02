'use client';

/**
 * Table Skeleton Component
 * Loading skeleton for table component
 */

import { cn } from '@/lib/utils';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  className?: string;
  showHeader?: boolean;
}

export function TableSkeleton({
  columns = 5,
  rows = 8,
  className,
  showHeader = true,
}: TableSkeletonProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse min-w-max">
        {showHeader && (
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-2 py-3 text-center">
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-100 w-full max-w-[120px] mx-auto">
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-20" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-100"
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    'py-3 text-sm whitespace-nowrap text-center',
                    colIndex === 0 ? 'pl-6 pr-4' : 'pl-8 pr-4'
                  )}
                >
                  <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto" style={{ width: `${60 + (colIndex * 15)}px` }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

