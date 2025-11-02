'use client';

import { Table } from "@/components/ui/table";
import { TableTitle } from "@/components/ui/table-title";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { TableControls } from "@/components/ui/table-controls";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useQuotationRequests from "@/customhooks/useQuotationRequests";
import { useTableFeatures } from "@/customhooks/useTableFeatures";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

/**
 * Quotation Requests Page
 * Display list of quotation requests with search, filter, export, and create functionality
 */

export default function QuotationRequestsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  const { data, isLoading, error, refetch, columns } = useQuotationRequests();

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
    exportFileName: 'quotation-requests.csv',
    searchableFields: ['requestId', 'dischargePort', 'loadingPort', 'status', 'totalamountFormatted', 'requestedShipmentDate'],
  });

  const handleCreateNewRequest = () => {
    router.push(`/${locale}/dashboard/quotation-requests/create`);
  };

  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <TableTitle title="Quotation Requests" className='text-navy-blue' />
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <TableControls
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onExport={handleExport}
            searchPlaceholder="Search requests..."
            disabled={isLoading || !filteredData || data.length === 0}
          />
          
          <Button
            onClick={handleCreateNewRequest}
            className="bg-[#003C71] hover:bg-[#003C71]/90 text-white whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Request
          </Button>
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
            {searchQuery ? 'No results found for your search.' : 'No quotation requests available.'}
          </div>
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            data={paginatedData}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, total)} of {total} results
          </div>
        </>
      )}
    </div>
  );
}

