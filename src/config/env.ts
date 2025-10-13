/**
 * Environment Configuration
 * Centralized environment variables and base URLs
 */

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  apiTimeout: 10000,
  rsaPublicKey: process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY || '',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

export default env;

