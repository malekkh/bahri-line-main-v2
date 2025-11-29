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
      label: 'Quote Number',
      className: 'max-w-24',
      sortable: true,
    },
    {
      key: 'dischargeport.name',
      label: 'Discharge Port',
      className: 'max-w-24',
      sortable: true,
      render: (value: any, row: any) => row.dischargeport?.name || '',
    },
    {
      key: 'loadingPort.name',
      label: 'Loading Port',
      className: 'max-w-24',
      sortable: true,
      render: (value: any, row: any) => row.loadingPort?.name || '',
    },
    {
      key: 'requestShipmentDate',
      label: 'Requested Shipment Date',
      className: 'max-w-24',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: any) => formatDateShort(row.requestShipmentDate || ''),
    },
    {
      key: 'totalAmount',
      label: 'Total Amount',
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
