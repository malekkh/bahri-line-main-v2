'use client';

/**
 * Contracts Logic Hook
 * Custom hook for contracts list page - handles data fetching with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { contractsRequests } from '@/services/requests/req';
import { contractsResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';
import type { Contract } from '@/types/contract.types';
import { formatDateShort } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';

export const useContractsLogic = () => {
  const { data, isLoading, error, refetch } = useQuery<Contract[], Error>({
    queryKey: ['contracts'],
    queryFn: async () => {
      try {
        const response = await contractsRequests.list();
        return contractsResponses.processList(response);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  const columns = [
    {
      key: 'contractNumber',
      label: 'Contract #',
      className: 'max-w-28',
      sortable: true,
      render: (value: any, row: Contract) => row.contractNumber || row.contractId || '-',
    },
    {
      key: 'name',
      label: 'Name',
      className: 'max-w-32',
      sortable: true,
      render: (value: any, row: Contract) => row.name || '-',
    },
    {
      key: 'accountName',
      label: 'Account',
      className: 'max-w-32',
      sortable: true,
      render: (value: any, row: Contract) => row.accountName || '-',
    },
    {
      key: 'effectiveFrom',
      label: 'Valid From',
      className: 'max-w-24',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: Contract) => formatDateShort(row.effectiveFrom || '') || '-',
    },
    {
      key: 'effectiveTo',
      label: 'Valid To',
      className: 'max-w-24',
      sortable: true,
      sortType: 'date' as const,
      render: (value: any, row: Contract) => formatDateShort(row.effectiveTo || '') || '-',
    },
    {
      key: 'totalAmount',
      label: 'Total Amount',
      className: 'max-w-24',
      sortable: true,
      sortType: 'number' as const,
      render: (value: any, row: Contract) => formatCurrency(row.totalAmount || 0),
    },
    {
      key: 'status',
      label: 'Status',
      className: 'max-w-24',
      sortable: false,
      render: (value: any, row: Contract) =>
        React.createElement('span', { className: 'status-badge' }, row.status?.label || '-'),
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

export default useContractsLogic;

