'use client';

import { Table } from '@/components/ui/table';
import { TableTitle } from '@/components/ui/table-title';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { TableControls } from '@/components/ui/table-controls';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown } from 'lucide-react';
import useQuotationRequests from '@/customhooks/useQuotationRequests';
import { useOfferedQuotationsLogic } from '@/customhooks/useOfferedQuotationsLogic';
import { useTableFeatures } from '@/customhooks/useTableFeatures';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/ui/status-badge';
import React from 'react';

type ViewType = 'requests' | 'offered';

/**
 * Quotation Requests Page
 * Display list of quotation requests and offered quotations with dropdown to switch between them
 */

export default function QuotationRequestsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [viewType, setViewType] = useState<ViewType>('requests');

  // Fetch quotation requests data
  const quotationRequests = useQuotationRequests();

  // Fetch offered quotations data
  const offeredQuotations = useOfferedQuotationsLogic();

  // Select data and columns based on current view
  const currentData = viewType === 'requests' ? quotationRequests : offeredQuotations;
  const { data, isLoading, error, refetch, columns: baseColumns } = currentData;

  // Update status column to use StatusBadge component
  const columns = baseColumns.map((col: any) => {
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
    exportFileName: viewType === 'requests' ? 'quotation-requests.csv' : 'offered-quotations.csv',
    searchableFields: [
      'requestId',
      'quoteNumber',
      'name',
      'loadingPort',
      'dischargePort',
      'dischargeport',
      'status',
      'statusCode',
      'totalamount',
      'totalAmount',
      'requestedShipmentDate',
      'requestShipmentDate',
    ],
  });

  // Reset pagination when switching views
  useEffect(() => {
    setPage(1);
  }, [viewType, setPage]);

  const handleCreateNewRequest = () => {
    router.push(`/${locale}/dashboard/quotation-requests/create`);
  };

  const handleRowClick = (row: any) => {
    if (viewType === 'offered') {
      // Navigate to offered quotation details page
      router.push(`/${locale}/offered-quotations/${row.quoteId || row.id || row.opportunityid}`);
    }
    // Quotation requests don't have click navigation currently
  };

  const currentTitle = viewType === 'requests' ? 'Quotation Requests' : 'Offered Quotations';
  const searchPlaceholder = viewType === 'requests' ? 'Search requests...' : 'Search quotations...';
  const emptyMessage =
    viewType === 'requests'
      ? 'No quotation requests available.'
      : 'No offered quotations available.';

  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-2xl font-bold text-[#003C71] hover:text-[#003C71]/80 transition-colors">
                <span>{currentTitle}</span>
                <ChevronDown className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem
                onClick={() => setViewType('requests')}
                className={viewType === 'requests' ? 'bg-accent' : ''}
              >
                Quotation Requests
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setViewType('offered')}
                className={viewType === 'offered' ? 'bg-accent' : ''}
              >
                Offered Quotations
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <TableControls
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onExport={handleExport}
            searchPlaceholder={searchPlaceholder}
            disabled={isLoading || !filteredData || data.length === 0}
          />

          {viewType === 'offered' && (
            <Button
              onClick={handleCreateNewRequest}
              className="bg-[#003C71] hover:bg-[#003C71]/90 text-white whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Request
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton columns={columns?.length || 6} rows={10} />
      ) : error ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">Error loading data: {error.message}</div>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">
            {searchQuery ? 'No results found for your search.' : emptyMessage}
          </div>
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            data={paginatedData}
            sortConfig={sortConfig}
            onSort={handleSort}
            onRowClick={viewType === 'offered' ? handleRowClick : undefined}
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
