"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { createArticle } from "@/lib/firebase/articles";
import { useAuth } from "@/components/ui/dashboard/auth/AuthProvider";
import { uploadImage } from "@/lib/firebase/uploadImage";
import RichTextEditor from "./RichTextEditor";

export default function ArticleForm() {
  const router = useRouter();

  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const imagePreviewUrlRef = useRef("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [category, setCategory] = useState<
    "Create" | "Work" | "Grow" | "Think" | "Other"
  >("Create");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);
  const [isBodyImageUploading, setIsBodyImageUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
    };
  }, []);

  function clearPreviewImage() {
    if (imagePreviewUrlRef.current) {
      URL.revokeObjectURL(imagePreviewUrlRef.current);
      imagePreviewUrlRef.current = "";
    }

    setImagePreviewUrl("");
  }

  function handleImageFileChange(file: File | null) {
    setImageFile(file);
    clearPreviewImage();

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    imagePreviewUrlRef.current = objectUrl;
    setImagePreviewUrl(objectUrl);
  }

  function clearSelectedImage() {
    setImageFile(null);
    clearPreviewImage();
    setFileInputKey((currentKey) => currentKey + 1);
  }

  function resetForm() {
    setTitle("");
    setSlug("");
    setContent("");
    clearSelectedImage();
    setCategory("Create");
    setStatus("draft");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("SUBMIT 1: handleSubmit started");

    setLoading(true);
    setMessage(null);

    if (isBodyImageUploading) {
      console.log("SUBMIT STOP: body image is still uploading");

      setLoading(false);
      setMessage({
        type: "error",
        text: "Please wait for body images to finish uploading before saving.",
      });

      return;
    }

    if (!user) {
      console.log("SUBMIT STOP: no authenticated user");

      setLoading(false);
      setMessage({
        type: "error",
        text: "You must be logged in to save an article.",
      });

      return;
    }

    console.log("SUBMIT 2: user exists:", user.uid);

    let uploadedImageUrl: string | undefined;

    try {
      if (imageFile) {
        console.log("SUBMIT 3: featured image exists");
        console.log("SUBMIT 4: about to call uploadImage");

        uploadedImageUrl = await uploadImage(imageFile, {
          folder: "articles",
          userId: user.uid,
        });

        console.log(
          "SUBMIT 5: featured image uploaded successfully:",
          uploadedImageUrl,
        );
      } else {
        console.log("SUBMIT 3: no featured image");
      }

      console.log("SUBMIT 6: about to call createArticle");

      await createArticle({
        title,
        slug,
        content,
        imageUrl: uploadedImageUrl,
        author: user.displayName || "Admin",
        category,
        status,
      });

      console.log("SUBMIT 7: createArticle finished");

      resetForm();

      setMessage({
        type: "success",
        text: `Article "${title}" has been saved successfully!`,
      });

      console.log("SUBMIT 8: redirecting");

      router.push("/dashboard/articles");
    } catch (error) {
      console.error("SUBMIT ERROR:", error);

      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to save article",
      });
    } finally {
      console.log("SUBMIT 9: finally reached");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-6 bg-white rounded-lg border border-slate-200 p-6 shadow-sm"
    >
      {message && (
        <div
          className={`rounded-lg p-4 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Article Title *
        </label>
        <input
          id="title"
          type="text"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(e.target.value.toLowerCase().replaceAll(" ", "-"));
          }}
          required
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Article Slug *
        </label>
        <input
          id="slug"
          type="text"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          placeholder="article-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <div className="space-y-3">
        <label
          htmlFor="imageFile"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Featured Image
        </label>

        <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
          <label
            htmlFor="imageFile"
            className="inline-flex cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            Choose image
          </label>

          <input
            id="featuredImageFileName"
            type="text"
            readOnly
            value={imageFile?.name ?? ""}
            placeholder="No image selected"
            aria-label="Selected featured image filename"
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm outline-none"
          />
        </div>

        <input
          key={fileInputKey}
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            handleImageFileChange(file);
          }}
          className="sr-only"
        />

        {imagePreviewUrl && imageFile && (
          <div className="space-y-3">
            <div className="relative h-56 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <Image
                src={imagePreviewUrl}
                alt={`Preview of ${imageFile.name}`}
                unoptimized
                fill
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>

            <button
              type="button"
              onClick={clearSelectedImage}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove image
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Article Content *
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          userId={user?.uid}
          onImageUploadChange={setIsBodyImageUploading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Category *
          </label>
          <select
            id="category"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as
                  | "Create"
                  | "Work"
                  | "Grow"
                  | "Think"
                  | "Other",
              )
            }
            required
          >
            <option value="Create">Create</option>
            <option value="Work">Work</option>
            <option value="Grow">Grow</option>
            <option value="Think">Think</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Status *
          </label>
          <select
            id="status"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            required
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading || isBodyImageUploading}
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBodyImageUploading
            ? "Uploading image..."
            : loading
              ? "Saving..."
              : "Save Article"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
