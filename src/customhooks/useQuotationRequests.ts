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
    const responseData = response.data;

    // Handle different response formats from /quotes/getQuotes
    // It returns { opportunities: [...] } format
    if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
      if ('opportunities' in responseData && Array.isArray((responseData as any).opportunities)) {
        return (responseData as any).opportunities;
      }
      // Fallback to other possible formats
      if ('data' in responseData && Array.isArray((responseData as any).data)) {
        return (responseData as any).data;
      }
      if ('quotes' in responseData && Array.isArray((responseData as any).quotes)) {
        return (responseData as any).quotes;
      }
    }

    // If it's already an array, return it
    if (Array.isArray(responseData)) {
      return responseData;
    }

    return [];
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['quotationRequests'],
    queryFn: () => getQuotationRequests(),
  });

  const columns = [
    {
      key: 'requestId',
      label: 'Request ID',
      className: 'max-w-24',
      sortable: true,
      render: (value: any, row: any) => row.requestId || row.quoteNumber || '',
    },
    {
      key: 'name',
      label: 'Name',
      className: 'max-w-32',
      sortable: true,
    },
    {
      key: 'loadingPort',
      label: 'Port of Load',
      className: 'max-w-24',
      sortable: true,
      render: (value: any, row: any) => {
        // Handle both string and object formats
        if (typeof row.loadingPort === 'string') {
          return row.loadingPort;
        }
        return row.loadingPort?.name || '';
      },
    },
    {
      key: 'dischargePort',
      label: 'Port of Discharge',
      className: 'max-w-28',
      sortable: true,
      render: (value: any, row: any) => {
        // Handle both string and object formats (check both dischargePort and dischargeport)
        if (typeof row.dischargePort === 'string') {
          return row.dischargePort;
        }
        if (typeof row.dischargeport === 'string') {
          return row.dischargeport;
        }
        return row.dischargePort?.name || row.dischargeport?.name || '';
      },
    },
    {
      key: 'requestedShipmentDate',
      label: 'Cargo Ready Date',
      className: 'max-w-32',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: any) => {
        // Check both requestedShipmentDate (API) and requestShipmentDate (legacy)
        const date = row.requestedShipmentDate || row.requestShipmentDate || '';
        return date ? formatDateShort(date) : '';
      },
    },
    {
      key: 'totalamount',
      label: 'Total Price',
      className: 'max-w-24',
      sortable: true,
      sortType: 'number' as const,
      render: (value: any, row: any) => {
        // Use totalamountFormatted if available, otherwise format the number
        if (row.totalamountFormatted) {
          return row.totalamountFormatted;
        }
        const amount = row.totalamount || row.totalAmount || 0;
        return formatCurrency(amount);
      },
    },
    {
      key: 'statusCode',
      label: 'Status',
      className: 'max-w-24',
      sortable: false,
      render: (value: any, row: any) => {
        // Prefer string status over numeric statusCode for better display
        // StatusBadge handles both string and number types
        const status = row.status || row.statusCode;
        return React.createElement(StatusBadge, { status });
      },
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
