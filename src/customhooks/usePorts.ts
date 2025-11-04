/**
 * Ports Hook
 * Custom hook for fetching ports data
 */

import { useQuery } from '@tanstack/react-query';
import { authRequests } from '@/services/requests/req';
import type { Port } from '@/services/api/axiosRoutes.type';

export interface UsePortsReturn {
  ports: Port[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const usePorts = (): UsePortsReturn => {
  const {
    data: portsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['ports'],
    queryFn: async () => {
      const response = await authRequests.getPorts();
      // Handle both array response and object with data property
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return (response.data as any)?.ports || (response.data as any)?.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    ports: portsData || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

