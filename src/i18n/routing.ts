import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'] as const,

  // Used when no locale matches
  defaultLocale: 'en' as const,

  // The `pathnames` option is used to define route names that differ
  // between locales.
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/dashboard': '/dashboard',
    '/users': '/users',
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

