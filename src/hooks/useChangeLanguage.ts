'use client';

/**
 * Language Change Hook
 * Hook for handling language switching in i18n setup
 */

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export const useChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = useCallback(
    (locale: string) => {
      // Extract the current locale from pathname
      const segments = pathname.split('/');
      const currentLocale = segments[1];

      // Replace the locale in the pathname
      const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);

      // Navigate to the new path
      router.push(newPathname);
    },
    [pathname, router]
  );

  return { changeLanguage };
};

export default useChangeLanguage;

