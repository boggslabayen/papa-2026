"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  deleteInquiryById,
  getInquiryById,
  markInquiryAsRead,
  type BookingInquiry,
} from "@/lib/firebase/booking";

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

export default function InquiryPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [inquiry, setInquiry] = useState<BookingInquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadInquiry() {
      try {
        const result = await getInquiryById(params.id);

        if (!result) {
          if (isMounted) {
            setError("Inquiry not found.");
          }

          return;
        }

        if (result.status === "unread") {
          await markInquiryAsRead(params.id);

          if (isMounted) {
            setInquiry({
              ...result,
              status: "read",
            });
          }

          return;
        }

        if (isMounted) {
          setInquiry(result);
        }
      } catch (error) {
        console.error("Unable to load inquiry", error);

        if (isMounted) {
          setError("Unable to load inquiry. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInquiry();

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteInquiryById(params.id);

      router.push("/dashboard/inquiries");
    } catch (error) {
      console.error("Unable to delete inquiry", error);

      setError("Unable to delete inquiry. Please try again.");
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="px-[5%] py-8">
        <p className="text-sm text-gray-600">Loading inquiry...</p>
      </main>
    );
  }

  if (error && !inquiry) {
    return (
      <main className="px-[5%] py-8">
        <p className="text-sm text-red-600">{error || "Inquiry not found."}</p>
      </main>
    );
  }

  if (!inquiry) {
    return (
      <main className="px-[5%] py-8">
        <p className="text-sm text-red-600">Inquiry not found.</p>
      </main>
    );
  }

  return (
    <main className="px-[5%] py-8">
      <Link
        href="/dashboard/inquiries"
        className="mb-6 inline-block text-sm text-gray-600 hover:text-black"
      >
        ← Back to inquiries
      </Link>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">{inquiry.name}</h1>

          <p className="mt-2 text-sm text-gray-600">Booking inquiry details</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
            inquiry.status === "unread"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {inquiry.status}
        </span>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-6 border-b border-gray-200 p-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Name
            </p>

            <p className="mt-1 text-gray-900">{inquiry.name}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Email
            </p>

            <p className="mt-1 text-gray-900">{inquiry.email}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Organization
            </p>

            <p className="mt-1 text-gray-900">
              {inquiry.organization || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Event Type
            </p>

            <p className="mt-1 text-gray-900">{inquiry.eventType}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Audience Size
            </p>

            <p className="mt-1 text-gray-900">
              {inquiry.audienceSize || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Preferred Date
            </p>

            <p className="mt-1 text-gray-900">
              {inquiry.preferredDate || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Submitted
            </p>

            <p className="mt-1 text-gray-900">{formatCreatedAt(inquiry)}</p>
          </div>
        </div>

        <div className="p-6">
          <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
            Message
          </p>

          <div className="rounded-lg bg-gray-50 p-5">
            <p className="whitespace-pre-wrap leading-7 text-gray-800">
              {inquiry.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Inquiry"}
          </button>
        </div>
      </div>
    </main>
  );
}
