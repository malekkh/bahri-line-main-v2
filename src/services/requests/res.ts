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
// ADD MORE FEATURE RESPONSES BELOW
// ============================================================================

// Example: Products Responses
// export const productsResponses = {
//   processList: (response: AxiosResponse<Product[]>) => response.data,
//   processProduct: (response: AxiosResponse<Product>) => response.data,
// };

// Example: Auth Responses
// export const authResponses = {
//   processLogin: (response: AxiosResponse<{ token: string; user: User }>) => {
//     return response.data;
//   },
// };

