'use client';

/**
 * Dashboard Layout
 * Shared layout for all dashboard pages with ProfileHeader
 */

import { ProfileHeader } from '@/components/layout/profile-header';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <ProfileHeader />
        {children}
      </div>
    </ProtectedRoute>
  );
}

