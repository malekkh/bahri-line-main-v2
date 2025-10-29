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
    REGISTER: '/register/registerAccount',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
    VALIDATE_INVITATION: '/contact/getContactByInvitation',
    UPDATE_CONTACT: '/updatecontact/update-contact',
    CHECK_CR: '/check-cr',
    POST_DOCUMENTS: '/account-documents',
    GET_TERRITORIES: '/territory/territories',
    GET_COUNTRIES: '/countries',
  },

  // Vessel Schedule
  VESSEL_SCHEDULE: {
    BASE: '/vesselSchedule',
    LIST_VOYAGES: '/vesselSchedule/listVoyages',
  },

  // Add more route groups as needed
} as const;

export default API_ROUTES;

