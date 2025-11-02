'use client';

import { Table } from "@/components/ui/table";
import { TableTitle } from "@/components/ui/table-title";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import useQuotationRequests from "@/customhooks/useQuotationRequests";

/**
 * Quotation Requests Page
 * Display list of quotation requests with search, filter, export, and create functionality
 */

export default function QuotationRequestsPage() {
  const { data, isLoading, error, refetch, columns } = useQuotationRequests();
  
  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      <TableTitle title="Quotation Requests" className='text-navy-blue'/>
      {isLoading ? (
        <TableSkeleton columns={columns?.length || 7} rows={10} />
      ) : error ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">Error loading data: {error.message}</div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
}

