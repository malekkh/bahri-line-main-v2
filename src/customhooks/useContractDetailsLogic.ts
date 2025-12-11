'use client';

/**
 * Contract Details Logic Hook
 * Fetches contract details and handles status updates
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contractsRequests } from '@/services/requests/req';
import { contractsResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';
import type { ContractDetail, UpdateContractStatusPayload, UpdateContractStatusResponse } from '@/types/contract.types';

export const useContractDetailsLogic = (contractId: string) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<ContractDetail | null, Error>({
    queryKey: ['contract', contractId],
    queryFn: async () => {
      if (!contractId) {
        return null;
      }
      try {
        const response = await contractsRequests.getById(contractId);
        return contractsResponses.processDetail(response);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: Boolean(contractId),
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: updateStatus,
    isPending: isUpdatingStatus,
    error: updateStatusError,
    isSuccess: updateStatusSuccess,
  } = useMutation<UpdateContractStatusResponse, Error, UpdateContractStatusPayload>({
    mutationFn: async (payload) => {
      try {
        const response = await contractsRequests.updateStatus(payload);
        return contractsResponses.processUpdateStatus(response);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });

  return {
    contract: data,
    isLoading,
    error: error ? handleApiError(error) : null,
    refetch,
    updateStatus,
    isUpdatingStatus,
    updateStatusError: updateStatusError ? handleApiError(updateStatusError) : null,
    updateStatusSuccess,
  };
};

export default useContractDetailsLogic;

