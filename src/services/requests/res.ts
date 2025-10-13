/**
 * API Responses
 * All API response handlers for the entire application
 */

import type { AxiosResponse } from 'axios';
import type { User, UsersResponse } from '@/types/user.types';

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
};

// ============================================================================
// ADD MORE FEATURE RESPONSES BELOW
// ============================================================================

// Example: Products Responses
// export const productsResponses = {
//   processList: (response: AxiosResponse<Product[]>) => response.data,
//   processProduct: (response: AxiosResponse<Product>) => response.data,
// };

