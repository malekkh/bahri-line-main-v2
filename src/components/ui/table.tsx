'use client';

/**
 * Table Component
 * Reusable table component with sortable headers
 */

import { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortOrder = 'asc' | 'desc' | null;
export type SortConfig = {
  column: string | null;
  order: SortOrder;
};

export type SortType = 'date' | 'number' | 'string';

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  sortType?: SortType; // Type of data for sorting (date, number, string)
  render?: (value: any, row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortConfig?: SortConfig;
  onSort?: (column: string) => void;
  className?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T) => void;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  sortConfig,
  onSort,
  className,
  rowClassName,
  onRowClick,
}: TableProps<T>) {
  const handleSort = (column: string) => {
    if (onSort) {
      onSort(column);
    }
  };

  const getRowClassName = (row: T, index: number) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, index);
    }
    return rowClassName || '';
  };

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-sm font-semibold text-gray-700 bg-gray-50',
                  column.sortable && 'cursor-pointer hover:bg-gray-100 select-none',
                  column.className
                )}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <span className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          'w-3 h-3',
                          sortConfig?.column === column.key && sortConfig?.order === 'asc'
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          'w-3 h-3 -mt-1',
                          sortConfig?.column === column.key && sortConfig?.order === 'desc'
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        )}
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  'border-b border-gray-100 hover:bg-gray-50 transition-colors',
                  onRowClick && 'cursor-pointer',
                  getRowClassName(row, index)
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn('px-4 py-3 text-sm text-gray-700', column.className)}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

