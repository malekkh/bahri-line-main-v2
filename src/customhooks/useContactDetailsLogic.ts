'use client';

/**
 * Contact Details Logic Hook
 * Custom hook for profile page - handles fetching with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { contactRequests } from '@/services/requests/req';
import { contactResponses } from '@/services/requests/res';
import { handleApiError } from '@/utils/handleApiError';

const CONTACT_DETAILS_QUERY_KEY = 'contactDetails';

export const useContactDetailsLogic = () => {
  // Fetch contact details
  const {
    data: contactData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [CONTACT_DETAILS_QUERY_KEY],
    queryFn: async () => {
      const response = await contactRequests.getContactDetails();
      return contactResponses.processContactDetails(response);
    },
  });

  return {
    // Data
    contactDetails: contactData || null,

    // States
    isLoading,
    error: error ? handleApiError(error) : null,

    // Actions
    refetch,
  };
};

export default useContactDetailsLogic;

