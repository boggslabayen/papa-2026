"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllInquiries, type BookingInquiry } from "@/lib/firebase/booking";

function formatCreatedAt(inquiry: BookingInquiry) {
  if (!inquiry.createdAt) {
    return "Not available";
  }

  return inquiry.createdAt.toDate().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadInquiries() {
      try {
        const allInquiries = await getAllInquiries();

        if (isMounted) {
          setInquiries(allInquiries);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load inquiries. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInquiries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="px-[5%] py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Booking Inquiries</h1>

        <p className="mt-2 text-sm text-gray-600">
          View and manage all booking inquiries.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-gray-600">Loading inquiries...</p>
        ) : error ? (
          <p className="p-6 text-sm text-red-600">{error}</p>
        ) : inquiries.length === 0 ? (
          <p className="p-6 text-sm text-gray-600">
            No booking inquiries found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>

                  <th className="px-4 py-3 font-semibold">Email</th>

                  <th className="px-4 py-3 font-semibold">Organization</th>

                  <th className="px-4 py-3 font-semibold">Event Type</th>

                  <th className="px-4 py-3 font-semibold">Preferred Date</th>

                  <th className="px-4 py-3 font-semibold">Status</th>

                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {inquiry.name}
                    </td>

                    <td className="px-4 py-3 text-gray-700">{inquiry.email}</td>

                    <td className="px-4 py-3 text-gray-700">
                      {inquiry.organization || "—"}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {inquiry.eventType}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {inquiry.preferredDate || "—"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          inquiry.status === "unread"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {formatCreatedAt(inquiry)}
                    </td>

                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/inquiries/${inquiry.id}`}
                        className="rounded-md bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
                      >
                        View
                      </Link>
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
