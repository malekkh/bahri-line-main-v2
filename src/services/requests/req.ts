/**
 * API Requests
 * All API request handlers for the entire application
 */

import { api } from '@/services/api/axiosSetup';
import API_ROUTES from '@/services/api/axiosRoutes';
import type { UsersApiTypes } from '@/services/api/axiosRoutes.type';

// ============================================================================
// USERS REQUESTS
// ============================================================================

export const usersRequests = {
  /**
   * Get all users with optional pagination
   */
  getAll: async (params: UsersApiTypes['getAll']['params']) => {
    return api.get<UsersApiTypes['getAll']['response']>(API_ROUTES.USERS.BASE, {
      params,
    });
  },

  /**
   * Get a single user by ID
   */
  getById: async (id: number) => {
    return api.get<UsersApiTypes['getById']['response']>(API_ROUTES.USERS.BY_ID(id));
  },

  /**
   * Create a new user
   */
  create: async (userData: UsersApiTypes['create']['body']) => {
    return api.post<UsersApiTypes['create']['response']>(API_ROUTES.USERS.BASE, userData);
  },

  /**
   * Update an existing user
   */
  update: async (id: number, userData: UsersApiTypes['update']['body']) => {
    return api.put<UsersApiTypes['update']['response']>(API_ROUTES.USERS.BY_ID(id), userData);
  },

  /**
   * Partially update a user
   */
  patch: async (id: number, userData: UsersApiTypes['patch']['body']) => {
    return api.patch<UsersApiTypes['patch']['response']>(API_ROUTES.USERS.BY_ID(id), userData);
  },

  /**
   * Delete a user
   */
  delete: async (id: number) => {
    return api.delete<UsersApiTypes['delete']['response']>(API_ROUTES.USERS.BY_ID(id));
  },

  /**
   * Search users by query
   */
  search: async (query: string) => {
    return api.get<UsersApiTypes['search']['response']>(API_ROUTES.USERS.SEARCH, {
      params: { q: query },
    });
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async () => {
    return api.get<UsersApiTypes['getCurrentUser']['response']>(API_ROUTES.USERS.ME);
  },
};

// ============================================================================
// ADD MORE FEATURE REQUESTS BELOW
// ============================================================================

// Example: Products Requests
// export const productsRequests = {
//   getAll: async () => {
//     return api.get(API_ROUTES.PRODUCTS.BASE);
//   },
//   // ... other product requests
// };

// Example: Auth Requests
// export const authRequests = {
//   login: async (credentials: { email: string; password: string }) => {
//     return api.post(API_ROUTES.AUTH.LOGIN, credentials);
//   },
//   // ... other auth requests
// };

