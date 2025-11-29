import React from 'react';
import { quotationRequestsRequests } from '@/services/requests/req';
import { useQuery } from '@tanstack/react-query';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatDateShort } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import type { QuotationRequest } from '@/services/api/axiosRoutes.type';

const useQuotationRequests = () => {
  const getQuotationRequests = async () => {
    const response = await quotationRequestsRequests.getAll();
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['quotationRequests'],
    queryFn: () => getQuotationRequests(),
  });

  const columns = [
    {
      key: 'quoteNumber',
      label: 'Quotation No',
      className: 'max-w-24',
      sortable: true,
    },
    {
      key: 'loadingPort.name',
      label: 'Port of Load',
      className: 'max-w-24',
      sortable: true,
      render: (value: any, row: any) => row.loadingPort?.name || '',
    },
    {
      key: 'dischargeport.name',
      label: 'Port of Discharge',
      className: 'max-w-24',
      sortable: true,
      render: (value: any, row: any) => row.dischargeport?.name || '',
    },
    {
      key: 'requestShipmentDate',
      label: 'Cargo Ready Date',
      className: 'max-w-24',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: any) => formatDateShort(row.requestShipmentDate || ''),
    },
    {
      key: 'effectiveFrom',
      label: 'Valid From',
      className: 'max-w-24',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: any) => formatDateShort(row.effectiveFrom || ''),
    },
    {
      key: 'effectiveTo',
      label: 'Valid To',
      className: 'max-w-24',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: any) => formatDateShort(row.effectiveTo || ''),
    },
    {
      key: 'totalAmount',
      label: 'Total Price',
      className: 'max-w-24',
      sortable: true,
      sortType: 'number' as const,
      render: (value: any, row: any) => formatCurrency(row.totalAmount || 0),
    },
    {
      key: 'statusCode',
      label: 'Status',
      className: 'max-w-24',
      sortable: false,
      render: (value: any, row: any) =>
        React.createElement(StatusBadge, { status: row.statusCode || row.status }),
    },
  ];

  // Handle different response formats
  let quotationData: QuotationRequest[] = [];
  if (Array.isArray(data)) {
    quotationData = data;
  } else if (data && typeof data === 'object') {
    quotationData = (data as any).data || (data as any).quotes || (data as any).opportunities || [];
  }

  return {
    data: quotationData,
    isLoading,
    error,
    refetch,
    columns,
  };
};

export default useQuotationRequests;
