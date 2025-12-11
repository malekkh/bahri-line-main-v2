'use client';

/**
 * Table Component
 * Reusable table component with sortable headers
 */

import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
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
      <table className="w-full border-collapse min-w-max">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={cn('px-2 py-3 text-center whitespace-nowrap', column.className)}
              >
                <button
                  type="button"
                  className={cn(
                    'inline-flex items-center justify-center gap-[2px] px-4 py-2 rounded-full bg-gray-100 text-sm font-bold text-gray-700 transition-colors whitespace-nowrap w-full',
                    column.sortable && 'cursor-pointer hover:bg-gray-300 select-none',
                    !column.sortable && 'cursor-default'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                  disabled={!column.sortable}
                >
                  <span className="whitespace-nowrap">{column.label}</span>
                  {column.sortable && (
                    <span className="flex items-center flex-shrink-0">
                      <ArrowUp
                        className={cn(
                          'w-3.5 h-3.5',
                          sortConfig?.column === column.key && sortConfig?.order === 'asc'
                            ? 'text-gray-700'
                            : 'text-gray-500'
                        )}
                      />
                      <ArrowDown
                        className={cn(
                          'w-3.5 h-3.5',
                          sortConfig?.column === column.key && sortConfig?.order === 'desc'
                            ? 'text-gray-700'
                            : 'text-gray-500'
                        )}
                      />
                    </span>
                  )}
                </button>
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
                {columns.map((column, colIndex) => {
                  const rawValue = row[column.key];
                  const cellContent = column.render ? column.render(rawValue, row) : rawValue;
                  const title =
                    typeof rawValue === 'string'
                      ? rawValue
                      : typeof rawValue === 'number'
                        ? String(rawValue)
                        : undefined;

                  return (
                    <td
                      key={column.key}
                      className={cn(
                        'py-3 text-sm text-gray-700 whitespace-nowrap text-center',
                        colIndex === 0 ? 'pl-6 pr-4' : 'pl-8 pr-4', // Match header button alignment: th px-2 (8px) + button px-4 (16px) = 24px total for first col
                        column.className
                      )}
                    >
                      <div className="max-w-[220px] truncate mx-auto" title={title}>
                        {cellContent}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
