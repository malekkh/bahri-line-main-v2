'use client';

/**
 * Users Page
 * Example of how to use the custom hook with React Query
 */

import { useState } from 'react';
import { useUsersLogic } from '@/customhooks/useUsersLogic';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const {
    users,
    total,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    isCreating,
    isUpdating,
    isDeleting,
  } = useUsersLogic(page, 10);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Users Management</h1>
        <p className="text-gray-600">Total users: {total}</p>
      </div>

      {/* Users List */}
      <div className="grid gap-4 mb-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              {user.role && (
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {user.role}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateUser({
                    id: user.id,
                    data: { name: `${user.name} (Updated)` },
                  })
                }
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={users.length === 0}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Create User Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() =>
            createUser({
              name: 'New User',
              email: 'newuser@example.com',
              password: 'password123',
            })
          }
          disabled={isCreating}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Creating...' : 'Create New User'}
        </button>
      </div>
    </div>
  );
}

