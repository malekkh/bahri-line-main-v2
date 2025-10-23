/**
 * Countries Hook
 * Custom hook for fetching countries data
 */

import { useQuery } from '@tanstack/react-query';
import { authRequests } from '@/services/requests/req';
import type { Country } from '@/services/api/axiosRoutes.type';

export interface UseCountriesReturn {
  countries: Country[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCountries = (): UseCountriesReturn => {
  const {
    data: countriesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await authRequests.getCountries();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    countries: countriesData?.countries || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
