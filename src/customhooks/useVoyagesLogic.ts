'use client';

/**
 * Voyages Logic Hook
 * Custom hook for vessels schedule page - handles fetching with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { vesselScheduleRequests } from '@/services/requests/req';
import { vesselScheduleResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';

const VOYAGES_QUERY_KEY = 'voyages';

export const useVoyagesLogic = (page: number = 1, limit: number = 10) => {
  // Fetch voyages - no sorting, we'll do it on the frontend
  const {
    data: voyagesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [VOYAGES_QUERY_KEY, { page, limit }],
    queryFn: async () => {
      const response = await vesselScheduleRequests.listVoyages({
        page,
        limit,
      });
      return vesselScheduleResponses.processListVoyages(response, page, limit);
    },
  });

  return {
    // Data
    voyages: voyagesData?.voyages || [],
    total: voyagesData?.total || 0,
    page: voyagesData?.page || page,
    limit: voyagesData?.limit || limit,
    totalPages: voyagesData?.totalPages || 0,

    // States
    isLoading,
    error: error ? handleApiError(error) : null,

    // Actions
    refetch,
  };
};

export default useVoyagesLogic;

