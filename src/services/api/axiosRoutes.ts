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
    CHECK_SESSION: '/auth/checksession',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHECK_CONTACT_EXISTENCE: '/auth/checkContactExistence',
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
    VOYAGE_ROUTES: '/vesselSchedule/VoyageRoutes',
  },

  // Contact/Profile
  CONTACT: {
    CONTACT_DETAILS: '/contact/contact-details',
    UPDATE_CONTACT_ACCOUNT: '/contact/update-contact-account',
  },
  
  // Quotation Requests
  QUOTATION_REQUESTS: {
    BASE: '/quotes/getQuotes', // Different endpoint from offered quotations
  },

  // Offered Quotations
  OFFERED_QUOTATIONS: {
    BASE: '/quotes/getOpportunityQuotes',
    BY_ID: (id: string) => `/quotes/getQuoteDetails/${id}`,
    UPDATE_PRICING_ACCEPTANCE: '/quotes/updatePricingAcceptance',
    UPDATE_SHIPMENT: (id: string) => `/quotes/${id}/update-fields`,
  },

  // Ports
  PORTS: {
    BASE: '/api/ports'
  },

  // Contracts
  CONTRACTS: {
    LIST: '/contracts/listContracts',
    BY_ID: (id: string | number) => `/contracts/${id}`,
    UPDATE_STATUS: '/contracts/updateContractStatus',
    DOWNLOAD_DOCUMENT: (id: string | number) => `/contracts/${id}/document`,
  },

  // Add more route groups as needed
} as const;

export default API_ROUTES;

