"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteArticleById,
  getArticles,
  setFeaturedArticleByCategory,
} from "@/lib/firebase/articles";
import { Article } from "@/types/articles";
import Link from "next/link";

type SortField =
  | "title"
  | "author"
  | "category"
  | "isFeatured"
  | "status"
  | "createdAt"
  | "updatedAt";
type SortDirection = "asc" | "desc";

type DashboardArticle = Omit<Article, "createdAt" | "updatedAt"> & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

function parseFirestoreDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }
  if (typeof value === "string" || typeof value === "number")
    return new Date(value);
  return undefined;
}

function formatDate(value: Date | undefined) {
  if (!value) return "-";
  return value.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusLabel(status: string) {
  return status === "published" ? "Published" : "Unpublished";
}

function getSortLabel(
  field: SortField,
  currentField: SortField,
  direction: SortDirection,
) {
  if (field !== currentField) return "";
  return direction === "asc" ? " ↑" : " ↓";
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<DashboardArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [featuringId, setFeaturingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      try {
        const fetched = await getArticles();
        const normalized: DashboardArticle[] = fetched.map((record) => ({
          id: record.id,
          title: record.title,
          slug: record.slug,
          content: record.content,
          imageUrl: record.imageUrl,
          isFeatured: Boolean(record.isFeatured),
          author: record.author,
          category: record.category,
          status: record.status,
          createdAt: parseFirestoreDate(record.createdAt),
          updatedAt: parseFirestoreDate(record.updatedAt),
        }));

        setArticles(normalized);
      } catch (error) {
        console.error("Failed to load articles", error);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        const searchValue = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !searchValue ||
          article.title.toLowerCase().includes(searchValue) ||
          article.author.toLowerCase().includes(searchValue);
        const matchesCategory =
          categoryFilter === "all" || article.category === categoryFilter;
        const matchesStatus =
          statusFilter === "all" || article.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = a[sortField] ?? "";
        const bValue = b[sortField] ?? "";

        let comparison = 0;

        if (sortField === "createdAt" || sortField === "updatedAt") {
          const aTime = aValue instanceof Date ? aValue.getTime() : 0;
          const bTime = bValue instanceof Date ? bValue.getTime() : 0;
          comparison = aTime - bTime;
        } else {
          comparison = String(aValue).localeCompare(String(bValue), undefined, {
            sensitivity: "base",
          });
        }

        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [
    articles,
    searchQuery,
    categoryFilter,
    statusFilter,
    sortField,
    sortDirection,
  ]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  };

  async function handleDeleteArticle(id: string, title: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteArticleById(id);

      setArticles((currentArticles) =>
        currentArticles.filter((article) => article.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete article", error);
      window.alert("Unable to delete the article. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetFeaturedArticle(article: DashboardArticle) {
    try {
      setFeaturingId(article.id);

      await setFeaturedArticleByCategory(article.category, article.id);

      setArticles((currentArticles) =>
        currentArticles.map((currentArticle) =>
          currentArticle.category === article.category
            ? {
                ...currentArticle,
                isFeatured: currentArticle.id === article.id,
                updatedAt: new Date(),
              }
            : currentArticle,
        ),
      );
    } catch (error) {
      console.error("Failed to set featured article", error);
      window.alert("Unable to update the featured article. Please try again.");
    } finally {
      setFeaturingId(null);
    }
  }

  return (
    <main className="px-[5%] py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Article Dashboard Title */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Articles</h1>
          <p className="text-sm text-gray-600">
            Manage and review published and draft articles.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Link
            href="/dashboard/articles/add-article"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
          >
            Add Article
          </Link>

          <div className="w-full sm:w-55">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title or author"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          <div className="w-full sm:w-45">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="all">All categories</option>
              <option value="Culture">Culture</option>
              <option value="Food">Food</option>
              <option value="Roots">Roots</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div className="w-full sm:w-45">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Unpublished</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("title")}
              >
                Title{getSortLabel("title", sortField, sortDirection)}
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("author")}
              >
                Author{getSortLabel("author", sortField, sortDirection)}
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("category")}
              >
                Category{getSortLabel("category", sortField, sortDirection)}
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("isFeatured")}
              >
                Featured{getSortLabel("isFeatured", sortField, sortDirection)}
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("status")}
              >
                Published / Unpublished
                {getSortLabel("status", sortField, sortDirection)}
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("createdAt")}
              >
                Date Created
                {getSortLabel("createdAt", sortField, sortDirection)}
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-medium"
                onClick={() => toggleSort("updatedAt")}
              >
                Date Updated
                {getSortLabel("updatedAt", sortField, sortDirection)}
              </th>

              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  Loading articles...
                </td>
              </tr>
            ) : filteredArticles.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No articles match the current filters.
                </td>
              </tr>
            ) : (
              filteredArticles.map((article) => (
                <tr
                  key={article.id ?? article.slug}
                  className="hover:bg-slate-50"
                >
                  <td className="px-4 py-4 font-medium text-slate-900">
                    <span className="block max-w-44 truncate xl:max-w-none xl:whitespace-normal">
                      {article.title}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-slate-700">{article.author}</td>

                  <td className="px-4 py-4 text-slate-700">
                    {article.category}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => handleSetFeaturedArticle(article)}
                      disabled={featuringId !== null || article.isFeatured}
                      className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed ${
                        article.isFeatured
                          ? "border-amber-300 bg-amber-50 text-amber-800"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      }`}
                    >
                      {article.isFeatured
                        ? "Featured"
                        : featuringId === article.id
                          ? "Setting..."
                          : "Set featured"}
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        article.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {getStatusLabel(article.status)}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-slate-700">
                    {formatDate(article.createdAt)}
                  </td>

                  <td className="px-4 py-4 text-slate-700">
                    {formatDate(article.updatedAt)}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/articles/${article.id}/edit`}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteArticle(article.id, article.title)
                        }
                        disabled={deletingId === article.id}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === article.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
