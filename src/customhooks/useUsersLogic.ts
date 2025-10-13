'use client';

/**
 * Users Logic Hook
 * Custom hook for users page - handles fetching with React Query and connects UI to API
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersRequests } from '@/services/requests/req';
import { usersResponses } from '@/services/requests/res';
import type { CreateUserDto, UpdateUserDto } from '@/types/user.types';
import { handleApiError } from '@/utils/handleApiError';

const USERS_QUERY_KEY = 'users';

export const useUsersLogic = (page: number = 1, limit: number = 10) => {
  const queryClient = useQueryClient();

  // Fetch all users
  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [USERS_QUERY_KEY, { page, limit }],
    queryFn: async () => {
      const response = await usersRequests.getAll({ page, limit });
      return usersResponses.processGetAll(response);
    },
  });

  // Fetch single user
  const useUserById = (id: number) => {
    return useQuery({
      queryKey: [USERS_QUERY_KEY, id],
      queryFn: async () => {
        const response = await usersRequests.getById(id);
        return usersResponses.processUser(response);
      },
      enabled: !!id,
    });
  };

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: CreateUserDto) => {
      const response = await usersRequests.create(userData);
      return usersResponses.processUser(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
    onError: (error) => {
      const apiError = handleApiError(error);
      console.error('Failed to create user:', apiError.message);
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateUserDto }) => {
      const response = await usersRequests.update(id, data);
      return usersResponses.processUser(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
    onError: (error) => {
      const apiError = handleApiError(error);
      console.error('Failed to update user:', apiError.message);
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await usersRequests.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
    onError: (error) => {
      const apiError = handleApiError(error);
      console.error('Failed to delete user:', apiError.message);
    },
  });

  // Search users
  const searchUsersMutation = useMutation({
    mutationFn: async (query: string) => {
      const response = await usersRequests.search(query);
      return usersResponses.processUserList(response);
    },
  });

  return {
    // Data
    users: usersData?.users || [],
    total: usersData?.total || 0,
    page: usersData?.page || 1,
    limit: usersData?.limit || 10,

    // States
    isLoading,
    error: error ? handleApiError(error) : null,

    // Actions
    refetch,
    useUserById,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    searchUsers: searchUsersMutation.mutate,

    // Mutation states
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    isSearching: searchUsersMutation.isPending,
  };
};

export default useUsersLogic;

