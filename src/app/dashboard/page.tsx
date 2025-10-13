'use client';

/**
 * Dashboard Page
 * Protected dashboard page (example redirect target after login)
 */

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome! You have successfully logged in.
        </p>
      </div>
    </div>
  );
}

