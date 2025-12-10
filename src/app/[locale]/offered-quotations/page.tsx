'use client';

import { Table } from '@/components/ui/table';
import { TableTitle } from '@/components/ui/table-title';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { TableControls } from '@/components/ui/table-controls';
import { Pagination } from '@/components/ui/pagination';
import { useOfferedQuotationsLogic } from '@/customhooks/useOfferedQuotationsLogic';
import { useTableFeatures } from '@/customhooks/useTableFeatures';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/status-badge';
import React from 'react';

/**
 * Offered Quotations Page
 * Display list of offered quotations with search, filter, export functionality
 */

export default function OfferedQuotationsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const { data, isLoading, error, refetch, columns: baseColumns } = useOfferedQuotationsLogic();

  // Update status column to use StatusBadge component
  const columns = baseColumns.map((col) => {
    if (col.key === 'statusCode') {
      return {
        ...col,
        render: (value: any, row: any) =>
          React.createElement(StatusBadge, { status: row.statusCode || row.status }),
      };
    }
    return col;
  });

  const {
    data: paginatedData,
    filteredData,
    total,
    totalPages,
    page,
    setPage,
    searchQuery,
    handleSearchChange,
    sortConfig,
    handleSort,
    handleExport,
  } = useTableFeatures({
    data,
    columns,
    exportFileName: 'offered-quotations.csv',
    searchableFields: [
      'quoteNumber',
      'name',
      'loadingPort.name' as any,
      'dischargeport.name' as any,
      'statusCode.label' as any,
      'totalAmount',
      'requestShipmentDate',
      'effectiveFrom',
      'effectiveTo',
    ],
  });

  const handleRowClick = (row: any) => {
    router.push(`/${locale}/offered-quotations/${row.quoteId}`);
  };

  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <TableTitle title="Offered Quotations" className="text-navy-blue" />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <TableControls
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onExport={handleExport}
            searchPlaceholder="Search quotations..."
            disabled={isLoading || !filteredData || data.length === 0}
          />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton columns={columns?.length || 8} rows={10} />
      ) : error ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">Error loading data: {error.message}</div>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">
            {searchQuery ? 'No results found for your search.' : 'No offered quotations available.'}
          </div>
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            data={paginatedData}
            sortConfig={sortConfig}
            onSort={handleSort}
            onRowClick={handleRowClick}
          />

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} results
          </div>
        </>
      )}
    </div>
  );
}
