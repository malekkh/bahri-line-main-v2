/**
 * Global Constants
 * Static constants used throughout the application
 */

export const AUTH_TOKEN_KEY = 'authToken';

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;

export default {
  AUTH_TOKEN_KEY,
  PAGINATION,
  HTTP_STATUS,
  ROUTES,
};

