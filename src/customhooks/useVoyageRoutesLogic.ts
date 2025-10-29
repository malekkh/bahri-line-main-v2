'use client';

/**
 * Voyage Routes Logic Hook
 * Custom hook for fetching voyage routes with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { vesselScheduleRequests } from '@/services/requests/req';
import { vesselScheduleResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';

const VOYAGE_ROUTES_QUERY_KEY = 'voyageRoutes';

export const useVoyageRoutesLogic = (voyageId: string | null, enabled: boolean = true) => {
  // Fetch voyage routes
  const {
    data: routes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [VOYAGE_ROUTES_QUERY_KEY, voyageId],
    queryFn: async () => {
      if (!voyageId) throw new Error('Voyage ID is required');
      const response = await vesselScheduleRequests.getVoyageRoutes(voyageId);
      return vesselScheduleResponses.processVoyageRoutes(response);
    },
    enabled: enabled && !!voyageId,
  });

  return {
    // Data
    routes: routes || [],

    // States
    isLoading,
    error: error ? handleApiError(error) : null,

    // Actions
    refetch,
  };
};

export default useVoyageRoutesLogic;

