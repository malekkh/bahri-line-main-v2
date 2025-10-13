/**
 * Cookie Detection Utility
 * Detects if third-party cookies are enabled/allowed
 */

/**
 * Check if cookies are enabled in the browser
 */
export const areCookiesEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;

  try {
    // Try to set a test cookie
    document.cookie = 'cookietest=1; SameSite=Lax';
    const cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
    
    // Clean up test cookie
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    
    return cookiesEnabled;
  } catch (e) {
    return false;
  }
};

/**
 * Check if third-party cookies are enabled
 * Returns a promise that resolves to true/false
 */
export const areThirdPartyCookiesEnabled = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return true;

  return new Promise((resolve) => {
    // First check if cookies are enabled at all
    if (!areCookiesEnabled()) {
      resolve(false);
      return;
    }

    // For third-party cookie detection, we'd need to make a cross-origin request
    // For now, we'll just check if cookies work in general
    resolve(areCookiesEnabled());
  });
};

/**
 * Get cookie consent status
 * Returns true if cookies are allowed, false if blocked, null if unknown
 */
export const getCookieConsentStatus = (): boolean | null => {
  if (typeof window === 'undefined') return null;

  const cookiesEnabled = areCookiesEnabled();
  
  if (!cookiesEnabled) {
    return false;
  }

  // Check for stored consent (if you have a consent banner)
  const consent = localStorage.getItem('cookieConsent');
  if (consent !== null) {
    return consent === 'true';
  }

  // If cookies work and no explicit rejection, assume allowed
  return cookiesEnabled;
};

export default {
  areCookiesEnabled,
  areThirdPartyCookiesEnabled,
  getCookieConsentStatus,
};

