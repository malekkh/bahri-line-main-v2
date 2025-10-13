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

  // Auth (example)
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },

  // Add more route groups as needed
} as const;

export default API_ROUTES;

