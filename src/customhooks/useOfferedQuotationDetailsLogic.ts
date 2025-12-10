'use client';

/**
 * Offered Quotation Details Logic Hook
 * Custom hook for offered quotation details/steps page - handles data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { offeredQuotationsRequests } from '@/services/requests/req';
import { offeredQuotationsResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';
import type {
  OfferedQuoteFull,
  QuoteProduct,
  GetQuoteDetailsResult,
  UpdateQuotePricingAcceptancePayload,
  UpdateOfferedQuoteShipmentPayload,
} from '@/types/offered-quotation.types';

export const useOfferedQuotationDetailsLogic = (quoteId: string) => {
  const queryClient = useQueryClient();

  // Fetch quote details
  const {
    data: quoteData,
    isLoading,
    error,
    refetch,
  } = useQuery<GetQuoteDetailsResult, Error>({
    queryKey: ['offered-quotation-details', quoteId],
    queryFn: async () => {
      try {
        const response = await offeredQuotationsRequests.getById(quoteId);
        return offeredQuotationsResponses.processGetDetails(response);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: !!quoteId,
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false,
  });

  // Update pricing acceptance mutation
  const updatePricingAcceptanceMutation = useMutation({
    mutationFn: async (payload: UpdateQuotePricingAcceptancePayload) => {
      const response = await offeredQuotationsRequests.updatePricingAcceptance(payload);
      return offeredQuotationsResponses.processUpdatePricingAcceptance(response);
    },
    onSuccess: () => {
      // Invalidate and refetch quote details
      queryClient.invalidateQueries({ queryKey: ['offered-quotation-details', quoteId] });
      queryClient.invalidateQueries({ queryKey: ['offered-quotations'] });
    },
    onError: (error) => {
      throw handleApiError(error);
    },
  });

  // Update shipment mutation
  const updateShipmentMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateOfferedQuoteShipmentPayload }) => {
      const response = await offeredQuotationsRequests.updateShipment(id, payload);
      return offeredQuotationsResponses.processUpdateShipment(response);
    },
    onSuccess: () => {
      // Invalidate and refetch quote details
      queryClient.invalidateQueries({ queryKey: ['offered-quotation-details', quoteId] });
      queryClient.invalidateQueries({ queryKey: ['offered-quotations'] });
    },
    onError: (error) => {
      throw handleApiError(error);
    },
  });

  return {
    quote: quoteData?.quote,
    products: quoteData?.products || [],
    isLoading,
    error: error ? handleApiError(error) : null,
    refetch,
    updatePricingAcceptance: updatePricingAcceptanceMutation.mutateAsync,
    isUpdatingPricingAcceptance: updatePricingAcceptanceMutation.isPending,
    updateShipment: (payload: UpdateOfferedQuoteShipmentPayload) =>
      updateShipmentMutation.mutateAsync({ id: quoteId, payload }),
    isUpdatingShipment: updateShipmentMutation.isPending,
  };
};

export default useOfferedQuotationDetailsLogic;


