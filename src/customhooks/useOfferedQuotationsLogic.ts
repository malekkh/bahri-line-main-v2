'use client';

/**
 * Offered Quotations Logic Hook
 * Custom hook for offered quotations list page - handles data fetching with React Query
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { offeredQuotationsRequests } from '@/services/requests/req';
import { offeredQuotationsResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';
import type { OfferedQuote } from '@/types/offered-quotation.types';
import { formatDateShort } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';

export const useOfferedQuotationsLogic = () => {
  // Fetch offered quotations
  const { data, isLoading, error, refetch } = useQuery<OfferedQuote[], Error>({
    queryKey: ['offered-quotations'],
    queryFn: async () => {
      try {
        const response = await offeredQuotationsRequests.getAll();
        return offeredQuotationsResponses.processGetAll(response);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false,
  });

  // Define table columns for the list view
  const columns = [
    {
      key: 'quoteNumber',
      label: 'Quotation Number',
      className: 'max-w-28',
      sortable: true,
      render: (value: any, row: OfferedQuote) => row.quoteNumber || '-',
    },
    {
      key: 'loadingPort.name',
      label: 'Port of Loading',
      className: 'max-w-24',
      sortable: true,
      render: (value: any, row: OfferedQuote) => row.loadingPort?.name || '-',
    },
    {
      key: 'dischargeport.name',
      label: 'Port of Discharge',
      className: 'max-w-26',
      sortable: true,
      render: (value: any, row: OfferedQuote) => row.dischargeport?.name || '-',
    },
    {
      key: 'requestShipmentDate',
      label: 'Requested Shipment Date',
      className: 'max-w-36',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: OfferedQuote) => formatDateShort(row.requestShipmentDate) || '-',
    },
    {
      key: 'effectiveFrom',
      label: 'Valid From',
      className: 'max-w-20',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: OfferedQuote) => formatDateShort(row.effectiveFrom) || '-',
    },
    {
      key: 'effectiveTo',
      label: 'Valid To',
      className: 'max-w-18',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: OfferedQuote) => formatDateShort(row.effectiveTo) || '-',
    },
    {
      key: 'totalAmount',
      label: 'Total Price',
      className: 'max-w-20',
      sortable: true,
      sortType: 'number' as const,
      render: (value: any, row: OfferedQuote) => formatCurrency(row.totalAmount || 0),
    },
    {
      key: 'statusCode',
      label: 'Status',
      className: 'max-w-24',
      sortable: false,
      render: (value: any, row: OfferedQuote) =>
        React.createElement('span', { className: 'status-badge' }, row.statusCode?.label || '-'),
    },
  ];

  return {
    data: data || [],
    isLoading,
    error: error ? handleApiError(error) : null,
    refetch,
    columns,
  };
};

export default useOfferedQuotationsLogic;
