'use client';

/**
 * Reusable Table Features Hook
 * Provides search, sort, export, and pagination functionality for tables
 */

import { useState, useMemo } from 'react';
import { exportToCSV } from '@/utils/exportToCSV';
import { sortData, type SortType } from '@/utils/sortData';
import type { Column, SortConfig } from '@/components/ui/table';

export interface UseTableFeaturesOptions<T> {
  data: T[];
  columns: Column<T>[];
  searchableFields?: (keyof T)[];
  itemsPerPage?: number;
  exportFileName?: string;
  initialPage?: number;
  initialSort?: SortConfig;
}

export function useTableFeatures<T extends Record<string, any>>({
  data,
  columns,
  searchableFields,
  itemsPerPage = 10,
  exportFileName = 'export.csv',
  initialPage = 1,
  initialSort = { column: null, order: null },
}: UseTableFeaturesOptions<T>) {
  const [page, setPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSort);

  // Determine searchable fields - use provided or default to all column keys
  const defaultSearchableFields = useMemo(
    () => columns.map((col) => col.key as keyof T),
    [columns]
  );

  const fieldsToSearch = searchableFields || defaultSearchableFields;

  // Filter data by search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    const searchLower = searchQuery.toLowerCase();
    return data.filter((item) => {
      return fieldsToSearch.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, searchQuery, fieldsToSearch]);

  // Sort the filtered data
  const sortedData = useMemo(() => {
    if (!sortConfig.column || !sortConfig.order) {
      return filteredData;
    }

    const columnConfig = columns.find((col) => col.key === sortConfig.column);
    if (!columnConfig) return filteredData;

    // Determine sort type - check if column has sortType, or infer from column key
    let sortType: SortType = columnConfig.sortType || 'string';
    
    if (!columnConfig.sortType) {
      const columnKey = sortConfig.column.toLowerCase();
      if (columnKey.includes('date') || columnKey.includes('time')) {
        sortType = 'date';
      } else if (
        columnKey.includes('amount') ||
        columnKey.includes('total') ||
        columnKey.includes('price') ||
        columnKey.includes('quantity') ||
        columnKey.includes('count')
      ) {
        sortType = 'number';
      }
    }

    return sortData([...filteredData], sortConfig.column, sortType, sortConfig.order);
  }, [filteredData, sortConfig, columns]);

  // Paginate the sorted data
  const { paginatedData, totalPages, total } = useMemo(() => {
    const total = sortedData.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginated = sortedData.slice(startIndex, startIndex + itemsPerPage);

    return { paginatedData: paginated, totalPages, total };
  }, [sortedData, page, itemsPerPage]);

  // Handle sort change
  const handleSort = (column: string) => {
    setSortConfig((prev) => {
      if (prev.column === column) {
        // Cycle through: asc -> desc -> null
        if (prev.order === 'asc') {
          return { column, order: 'desc' };
        } else if (prev.order === 'desc') {
          return { column: null, order: null };
        }
      }
      return { column, order: 'asc' };
    });
    // Reset to first page when sorting changes
    setPage(1);
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on search
  };

  // Handle export
  const handleExport = () => {
    exportToCSV(filteredData, exportFileName, columns);
  };

  return {
    // Data
    data: paginatedData,
    filteredData,
    sortedData,
    
    // Pagination
    page,
    setPage,
    totalPages,
    total,
    itemsPerPage,
    
    // Search
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    
    // Sort
    sortConfig,
    setSortConfig,
    handleSort,
    
    // Export
    handleExport,
  };
}

