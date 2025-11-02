'use client';

import { Table } from "@/components/ui/table";
import { TableTitle } from "@/components/ui/table-title";
import useQuotationRequests from "@/customhooks/useQuotationRequests";

/**
 * Quotation Requests Page
 * Display list of quotation requests with search, filter, export, and create functionality
 */

export default function QuotationRequestsPage() {
  const { data, isLoading, error, refetch ,columns} = useQuotationRequests();
  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      {/* Page content will be added here */}
      <TableTitle title="Quotation Requests"  className='text-navy-blue'/>
      <Table
        columns={columns}
        data={data}
      />
    </div>
  );
}

