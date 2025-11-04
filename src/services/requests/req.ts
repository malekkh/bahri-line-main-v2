/**
 * API Requests
 * All API request handlers for the entire application
 */

import { api } from '@/services/api/axiosSetup';
import API_ROUTES from '@/services/api/axiosRoutes';
import type { UsersApiTypes, AuthApiTypes, VesselScheduleApiTypes, ContactApiTypes, QuotationRequestApiTypes } from '@/services/api/axiosRoutes.type';

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
   * Check if session is valid
   */
  checkSession: async () => {
    return api.get<AuthApiTypes['checkSession']['response']>(
      API_ROUTES.AUTH.CHECK_SESSION,
      ({ skipAuthRedirect: true } as any)
    );
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
    return api.get<AuthApiTypes['validateInvitation']['response']>(
      `${API_ROUTES.AUTH.VALIDATE_INVITATION}?code=${invitationCode}`
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

  /**
   * Check CR number validity
   */
  checkCR: async (crNumber: string) => {
    return api.get<AuthApiTypes['checkCR']['response']>(
      `${API_ROUTES.AUTH.CHECK_CR}?crNumber=${crNumber}`
    );
  },

  /**
   * Get territories list
   */
  getTerritories: async () => {
    return api.get<AuthApiTypes['getTerritories']['response']>(
      API_ROUTES.AUTH.GET_TERRITORIES
    );
  },

  /**
   * Get countries list
   */
  getCountries: async () => {
    return api.get<AuthApiTypes['getCountries']['response']>(
      API_ROUTES.AUTH.GET_COUNTRIES
    );
  },

  /**
   * Get ports list
   */
  getPorts: async () => {
    return api.get<AuthApiTypes['getPorts']['response']>(
      API_ROUTES.PORTS.BASE
    );
  },
};

// ============================================================================
// VESSEL SCHEDULE REQUESTS
// ============================================================================

export const vesselScheduleRequests = {
  /**
   * Get all voyages with optional pagination and sorting
   */
  listVoyages: async (params?: VesselScheduleApiTypes['listVoyages']['params']) => {
    return api.get<VesselScheduleApiTypes['listVoyages']['response']>(
      API_ROUTES.VESSEL_SCHEDULE.LIST_VOYAGES,
      {
        params,
      }
    );
  },
  /**
   * Get voyage routes for a specific voyage
   */
  getVoyageRoutes: async (voyageId: string) => {
    return api.post<VesselScheduleApiTypes['getVoyageRoutes']['response']>(
      API_ROUTES.VESSEL_SCHEDULE.VOYAGE_ROUTES,
      {
        voyageid: voyageId,
      }
    );
  },
};

// ============================================================================
// CONTACT/PROFILE REQUESTS
// ============================================================================

export const contactRequests = {
  /**
   * Get contact details with account information
   */
  getContactDetails: async () => {
    return api.get<ContactApiTypes['getContactDetails']['response']>(
      API_ROUTES.CONTACT.CONTACT_DETAILS
    );
  },

  /**
   * Update contact and/or account details
   */
  updateContactAccount: async (payload: ContactApiTypes['updateContactAccount']['body']) => {
    return api.post<ContactApiTypes['updateContactAccount']['response']>(
      API_ROUTES.CONTACT.UPDATE_CONTACT_ACCOUNT,
      payload
    );
  },
};

export const quotationRequestsRequests = {
  getAll: async () => {
    return api.get<QuotationRequestApiTypes['getAll']['response']>(
      API_ROUTES.QUOTATION_REQUESTS.BASE
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

