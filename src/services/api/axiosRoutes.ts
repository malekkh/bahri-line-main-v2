/**
 * API Routes Configuration
 * Define all API endpoint routes
 */

export const API_ROUTES = {
  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id: number | string) => `/users/${id}`,
    SEARCH: '/users/search',
    ME: '/users/me',
  },

  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
    VALIDATE_INVITATION: '/contact/getContactByInvitation',
    UPDATE_CONTACT: '/auth/update-contact',
  },

  // Add more route groups as needed
} as const;

export default API_ROUTES;

