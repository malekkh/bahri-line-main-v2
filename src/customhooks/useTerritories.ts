/**
 * Territories Hook
 * Custom hook for fetching territories data
 */

import { useQuery } from '@tanstack/react-query';
import { authRequests } from '@/services/requests/req';
import type { Territory } from '@/services/api/axiosRoutes.type';

export interface UseTerritoriesReturn {
  territories: Territory[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useTerritories = (): UseTerritoriesReturn => {
  const {
    data: territoriesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['territories'],
    queryFn: async () => {
      const response = await authRequests.getTerritories();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    territories: territoriesData?.territories || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
