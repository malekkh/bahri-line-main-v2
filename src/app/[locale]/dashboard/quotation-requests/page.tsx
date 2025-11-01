'use client';

import { Table } from "@/components/ui/table";
import { TableTitle } from "@/components/ui/table-title";

/**
 * Quotation Requests Page
 * Display list of quotation requests with search, filter, export, and create functionality
 */

export default function QuotationRequestsPage() {
  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      {/* Page content will be added here */}
      <TableTitle title="Quotation Requests"  className='text-navy-blue'/>
      {/* <Table
        columns={columns}
        data={data}
        sortConfig={sortConfig}
        onSort={handleSort}
        rowClassName="hover:bg-blue-50"
        onPageChange={handlePageChange}
        page={page}
        totalPages={totalPages}
      /> */}
    </div>
  );
}

