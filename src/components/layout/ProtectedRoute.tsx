'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authRequests } from '@/services/requests/req';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const params = useParams();
  const locale = (params as { locale?: string })?.locale || 'en';
  const [checking, setChecking] = React.useState(true);
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    authRequests
      .checkSession()
      .then((res) => {
        if (!isMounted) return;
        const active = Boolean(res?.data?.sessionActive);
        setAllowed(active);
        setChecking(false);
        if (!active) {
          router.replace(`/${locale}/login`);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setAllowed(false);
        setChecking(false);
        router.replace(`/${locale}/login`);
      });
    return () => {
      isMounted = false;
    };
  }, [router, locale]);

  if (checking) {
    return null;
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}


