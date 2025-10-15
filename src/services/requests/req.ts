/**
 * API Requests
 * All API request handlers for the entire application
 */

import { api } from '@/services/api/axiosSetup';
import API_ROUTES from '@/services/api/axiosRoutes';
import type { UsersApiTypes, AuthApiTypes } from '@/services/api/axiosRoutes.type';

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
// AUTH REQUESTS
// ============================================================================

export const authRequests = {
  /**
   * Login user
   */
  login: async (credentials: AuthApiTypes['login']['body']) => {
    return api.post<AuthApiTypes['login']['response']>(
      API_ROUTES.AUTH.LOGIN,
      credentials
    );
  },

  /**
   * Register new user
   */
  register: async (userData: AuthApiTypes['register']['body']) => {
    return api.post<AuthApiTypes['register']['response']>(
      API_ROUTES.AUTH.REGISTER,
      userData
    );
  },

  /**
   * Logout user
   */
  logout: async () => {
    return api.post<AuthApiTypes['logout']['response']>(API_ROUTES.AUTH.LOGOUT);
  },

  /**
   * Refresh access token
   */
  refreshToken: async () => {
    return api.post<AuthApiTypes['refreshToken']['response']>(API_ROUTES.AUTH.REFRESH);
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: AuthApiTypes['forgotPassword']['body']) => {
    return api.post<AuthApiTypes['forgotPassword']['response']>(
      API_ROUTES.AUTH.FORGOT_PASSWORD,
      email
    );
  },

  /**
   * Reset password
   */
  resetPassword: async (data: AuthApiTypes['resetPassword']['body']) => {
    return api.post<AuthApiTypes['resetPassword']['response']>(
      API_ROUTES.AUTH.RESET_PASSWORD,
      data
    );
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async () => {
    return api.get<AuthApiTypes['getCurrentUser']['response']>(API_ROUTES.AUTH.ME);
  },

  /**
   * Validate invitation code
   */
  validateInvitation: async (invitationCode: string) => {
    return api.post<AuthApiTypes['validateInvitation']['response']>(
      API_ROUTES.AUTH.VALIDATE_INVITATION,
      { invitationCode }
    );
  },

  /**
   * Update contact information
   */
  updateContact: async (contactData: AuthApiTypes['updateContact']['body']) => {
    return api.post<AuthApiTypes['updateContact']['response']>(
      API_ROUTES.AUTH.UPDATE_CONTACT,
      contactData
    );
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

