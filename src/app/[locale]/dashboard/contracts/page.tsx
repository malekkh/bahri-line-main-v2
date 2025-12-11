'use client';

import { Table } from '@/components/ui/table';
import { TableTitle } from '@/components/ui/table-title';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { TableControls } from '@/components/ui/table-controls';
import { Pagination } from '@/components/ui/pagination';
import { StatusBadge } from '@/components/ui/status-badge';
import { useContractsLogic } from '@/customhooks/useContractsLogic';
import { useTableFeatures } from '@/customhooks/useTableFeatures';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';

/**
 * Contracts Page
 * Displays list of customer contracts with search/export
 */

export default function ContractsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const { data, isLoading, error, refetch, columns: baseColumns } = useContractsLogic();

  const columns = baseColumns.map((col) => {
    if (col.key === 'status') {
      return {
        ...col,
        render: (value: any, row: any) =>
          React.createElement(StatusBadge, { status: row.status || row.statusCode }),
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
    exportFileName: 'contracts.csv',
    searchableFields: [
      'contractNumber',
      'name',
      'accountName',
      'status.label' as any,
      'totalAmount',
      'effectiveFrom',
      'effectiveTo',
    ],
  });

  const handleRowClick = (row: any) => {
    router.push(`/${locale}/dashboard/contracts/${row.contractId || row.id}`);
  };

  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <TableTitle title="Contracts" className="text-navy-blue" />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <TableControls
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onExport={handleExport}
            searchPlaceholder="Search contracts..."
            disabled={isLoading || !filteredData || data.length === 0}
          />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton columns={columns?.length || 6} rows={10} />
      ) : error ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">Error loading contracts: {error.message}</div>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">
            {searchQuery ? 'No results found for your search.' : 'No contracts available.'}
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

          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} results
          </div>
        </>
      )}
    </div>
  );
}
