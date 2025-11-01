'use client';

/**
 * Dashboard Page
 * Protected dashboard page (example redirect target after login)
 */

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome! You have successfully logged in.
      </p>
    </div>
  );
}

