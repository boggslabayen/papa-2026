"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getUsers, type AppUser } from "@/lib/firebase/users";

function formatCreatedAt(user: AppUser) {
  if (!user.createdAt) {
    return "Not available";
  }

  return user.createdAt.toDate().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const allUsers = await getUsers();

        if (isMounted) {
          setUsers(allUsers);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load users. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="px-[5%] py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Users</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all registered dashboard users.
          </p>
        </div>

        <Link
          href="/dashboard/users/add-user"
          className="w-fit rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add User
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-gray-600">Loading users...</p>
        ) : error ? (
          <p className="p-6 text-sm text-red-600">{error}</p>
        ) : users.length === 0 ? (
          <p className="p-6 text-sm text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold">User ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {formatCreatedAt(user)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {user.uid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
