"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getArticles } from "@/lib/firebase/articles";
import { getAllInquiries, type BookingInquiry } from "@/lib/firebase/booking";
import { getUsers } from "@/lib/firebase/users";
import type { Article } from "@/types/articles";

type DashboardArticle = Article & { id: string };

type DashboardData = {
  articles: DashboardArticle[];
  inquiries: BookingInquiry[];
  users: number;
};

function formatDate(value: BookingInquiry["createdAt"] | Article["createdAt"]) {
  if (!value) return "Date unavailable";

  return value.toDate().toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function articleDate(article: DashboardArticle) {
  return article.updatedAt ?? article.createdAt;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    articles: [],
    inquiries: [],
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      const results = await Promise.allSettled([
        getArticles(),
        getAllInquiries(),
        getUsers(),
      ]);

      if (!isMounted) return;

      const [articlesResult, inquiriesResult, usersResult] = results;
      const hasFailure = results.some((result) => result.status === "rejected");

      setData({
        articles:
          articlesResult.status === "fulfilled" ? articlesResult.value : [],
        inquiries:
          inquiriesResult.status === "fulfilled" ? inquiriesResult.value : [],
        users: usersResult.status === "fulfilled" ? usersResult.value.length : 0,
      });
      setError(
        hasFailure
          ? "Some dashboard data could not be loaded. You can still use the available sections below."
          : "",
      );
      setLoading(false);
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const publishedArticles = data.articles.filter(
    (article) => article.status === "published",
  ).length;
  const draftArticles = data.articles.length - publishedArticles;
  const unreadInquiries = data.inquiries.filter(
    (inquiry) => inquiry.status === "unread",
  ).length;
  const recentInquiries = data.inquiries.slice(0, 4);
  const recentArticles = [...data.articles]
    .sort((a, b) => {
      const aDate = articleDate(a)?.toDate().getTime() ?? 0;
      const bDate = articleDate(b)?.toDate().getTime() ?? 0;
      return bDate - aDate;
    })
    .slice(0, 4);

  const cards = [
    { label: "Published articles", value: publishedArticles, detail: `${draftArticles} draft${draftArticles === 1 ? "" : "s"}`, href: "/dashboard/articles" },
    { label: "Unread inquiries", value: unreadInquiries, detail: unreadInquiries ? "Needs your attention" : "Inbox is all caught up", href: "/dashboard/inquiries" },
    { label: "Total inquiries", value: data.inquiries.length, detail: "All booking requests", href: "/dashboard/inquiries" },
    { label: "Dashboard users", value: data.users, detail: "Admin accounts", href: "/dashboard/users" },
  ];

  return (
    <main className="mx-auto max-w-[1600px] px-[5%] py-8 md:py-10">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Overview</p>
          <h1 className="mb-0 text-4xl font-bold tracking-tight">Content Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Keep your content, booking requests, and team in view.</p>
        </div>
        <Link href="/dashboard/articles/add-article" className="inline-flex w-fit items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">Create article</Link>
      </div>

      {error && <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</p>}

      <section aria-label="Dashboard statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
            <p className="text-sm font-medium text-gray-600">{card.label}</p>
            <p className="mt-3 text-4xl font-bold tracking-tight text-gray-950">{loading ? "-" : card.value}</p>
            <p className="mt-3 text-sm text-gray-500 group-hover:text-gray-700">{card.detail}</p>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold">Recent inquiries</h2>
              <p className="mt-1 text-sm text-gray-500">Latest booking requests from your site.</p>
            </div>
            <Link href="/dashboard/inquiries" className="text-sm font-semibold text-gray-900 underline-offset-4 hover:underline">View all</Link>
          </div>
          {loading ? (
            <p className="p-5 text-sm text-gray-500">Loading inquiries...</p>
          ) : recentInquiries.length === 0 ? (
            <div className="p-5"><p className="font-medium text-gray-900">No inquiries yet</p><p className="mt-1 text-sm text-gray-500">New booking requests will appear here.</p></div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentInquiries.map((inquiry) => (
                <Link key={inquiry.id} href={`/dashboard/inquiries/${inquiry.id}`} className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-gray-50">
                  <div className="min-w-0"><p className="truncate font-semibold text-gray-950">{inquiry.name}</p><p className="mt-1 truncate text-sm text-gray-500">{inquiry.organization || inquiry.eventType || inquiry.email}</p></div>
                  <div className="shrink-0 text-right"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${inquiry.status === "unread" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"}`}>{inquiry.status === "unread" ? "Unread" : "Read"}</span><p className="mt-2 text-xs text-gray-500">{formatDate(inquiry.createdAt)}</p></div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Quick actions</h2>
          <p className="mt-1 text-sm text-gray-500">Common tasks, one click away.</p>
          <div className="mt-5 grid gap-3">
            <Link href="/dashboard/articles/add-article" className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-950 hover:bg-gray-50">Write a new article</Link>
            <Link href="/dashboard/inquiries" className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-950 hover:bg-gray-50">Review booking inquiries</Link>
            <Link href="/dashboard/users/add-user" className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-950 hover:bg-gray-50">Add a dashboard user</Link>
          </div>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div><h2 className="text-lg font-bold">Recent articles</h2><p className="mt-1 text-sm text-gray-500">Recently created or updated content.</p></div>
          <Link href="/dashboard/articles" className="text-sm font-semibold text-gray-900 underline-offset-4 hover:underline">Manage articles</Link>
        </div>
        {loading ? (
          <p className="p-5 text-sm text-gray-500">Loading articles...</p>
        ) : recentArticles.length === 0 ? (
          <div className="p-5"><p className="font-medium text-gray-900">Your article library is empty</p><Link href="/dashboard/articles/add-article" className="mt-2 inline-block text-sm font-semibold underline underline-offset-4">Create your first article</Link></div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/dashboard/articles/${article.id}/edit`} className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-gray-50">
                <div className="min-w-0"><p className="truncate font-semibold text-gray-950">{article.title}</p><p className="mt-1 text-sm text-gray-500">{article.category} · {article.author}</p></div>
                <div className="shrink-0 text-right"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${article.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>{article.status === "published" ? "Published" : "Draft"}</span><p className="mt-2 text-xs text-gray-500">{formatDate(articleDate(article))}</p></div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
