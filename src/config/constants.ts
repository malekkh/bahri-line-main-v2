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

// Color Palette - Based on provided design system
export const COLORS = {
  // Primary Colors
  NAVY_BLUE: '#003C71',
  BLACK: '#000000',
  DARK_COOL_GRAY: '#53565A',
  LIGHT_COOL_GRAY: '#A7A8A9',
  
  // Primary / Secondary Colors
  ORANGE: '#FF6720',
  BLUE: '#0077AA',
  MIDNIGHT_GREEN: '#52726F',
  DARK_GREEN: '#2D4046',
  RED: '#BB0012',
} as const;

// Semantic color mappings
export const SEMANTIC_COLORS = {
  primary: COLORS.NAVY_BLUE,
  secondary: COLORS.ORANGE,
  accent: COLORS.BLUE,
  success: COLORS.MIDNIGHT_GREEN,
  warning: COLORS.ORANGE,
  error: COLORS.RED,
  info: COLORS.BLUE,
  neutral: {
    50: '#FFFFFF',
    100: COLORS.LIGHT_COOL_GRAY,
    200: '#D1D5DB',
    300: '#9CA3AF',
    400: '#6B7280',
    500: COLORS.DARK_COOL_GRAY,
    600: '#374151',
    700: '#1F2937',
    800: '#111827',
    900: COLORS.BLACK,
  },
} as const;

export default {
  AUTH_TOKEN_KEY,
  PAGINATION,
  HTTP_STATUS,
  ROUTES,
  COLORS,
  SEMANTIC_COLORS,
};

