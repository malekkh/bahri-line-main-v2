/**
 * API Responses
 * All API response handlers for the entire application
 */

import type { AxiosResponse } from 'axios';
import type { User, UsersResponse } from '@/types/user.types';
import type { ValidateInvitationResponse, CheckCRResponse, Voyage, VoyageRoute } from '@/services/api/axiosRoutes.type';
import type { VoyagesResponse } from '@/types/voyage.types';
import type { ContactDetails, PatchResponse } from '@/types/contact.types';

// ============================================================================
// USERS RESPONSES
// ============================================================================

export const usersResponses = {
  /**
   * Process get all users response
   */
  processGetAll: (response: AxiosResponse<UsersResponse>): UsersResponse => {
    return response.data;
  },

  /**
   * Process single user response
   */
  processUser: (response: AxiosResponse<User>): User => {
    return response.data;
  },

  /**
   * Process user list response
   */
  processUserList: (response: AxiosResponse<User[]>): User[] => {
    return response.data;
  },

  /**
   * Process delete response
   */
  processDelete: (response: AxiosResponse<void>): void => {
    // No processing needed for void response
  },
};

// ============================================================================
// AUTH RESPONSES
// ============================================================================

export const authResponses = {
  /**
   * Process login response
   */
  processLogin: (
    response: AxiosResponse<{ success: boolean; message: string }>
  ): { success: boolean; message: string } => {
    return response.data;
  },

  /**
   * Process register response
   */
  processRegister: (
    response: AxiosResponse<{ token: string; user: User }>
  ): { token: string; user: User } => {
    return response.data;
  },

  /**
   * Process logout response
   */
  processLogout: (response: AxiosResponse<{ message: string }>): { message: string } => {
    return response.data;
  },

  /**
   * Process current user response
   */
  processCurrentUser: (response: AxiosResponse<User>): User => {
    return response.data;
  },

  /**
   * Process message response (forgot/reset password)
   */
  processMessage: (response: AxiosResponse<{ message: string }>): { message: string } => {
    return response.data;
  },

  /**
   * Process invitation validation response
   */
  processInvitationValidation: (response: AxiosResponse<ValidateInvitationResponse>): ValidateInvitationResponse => {
    return response.data;
  },

  /**
   * Process CR validation response
   */
  processCRValidation: (response: AxiosResponse<CheckCRResponse>): CheckCRResponse => {
    return response.data;
  },
};

// ============================================================================
// VESSEL SCHEDULE RESPONSES
// ============================================================================

export const vesselScheduleResponses = {
  /**
   * Process list voyages response
   */
  processListVoyages: (response: AxiosResponse<Voyage[]>, page: number = 1, limit: number = 10): VoyagesResponse => {
    const voyages = response.data;
    const total = voyages.length;
    const totalPages = Math.ceil(total / limit);

    return {
      voyages,
      total,
      page,
      limit,
      totalPages,
    };
  },
  /**
   * Process voyage routes response
   */
  processVoyageRoutes: (response: AxiosResponse<VoyageRoute[]>): VoyageRoute[] => {
    return response.data;
  },
};

// ============================================================================
// CONTACT/PROFILE RESPONSES
// ============================================================================

export const contactResponses = {
  /**
   * Process get contact details response
   */
  processContactDetails: (response: AxiosResponse<ContactDetails>): ContactDetails => {
    return response.data;
  },

  /**
   * Process update contact account response
   */
  processUpdateContactAccount: (response: AxiosResponse<PatchResponse>): PatchResponse => {
    return response.data;
  },
};

// ============================================================================
// ADD MORE FEATURE RESPONSES BELOW
// ============================================================================

// Example: Products Responses
// export const productsResponses = {
//   processList: (response: AxiosResponse<Product[]>) => response.data,
//   processProduct: (response: AxiosResponse<Product>) => response.data,
// };

