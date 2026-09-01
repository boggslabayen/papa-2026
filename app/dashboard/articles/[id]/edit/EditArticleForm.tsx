"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { updateArticleById } from "@/lib/firebase/articles";
import { deleteImageByUrl, uploadImage } from "@/lib/firebase/uploadImage";
import type { Article } from "@/types/articles";
import { useAuth } from "@/components/ui/dashboard/auth/AuthProvider";
import RichTextEditor from "@/components/ui/dashboard/RichTextEditor";

type EditArticleFormProps = {
  article: Article & {
    id: string;
  };
};

export default function EditArticleForm({ article }: EditArticleFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [content, setContent] = useState(article.content);
  const [imageUrl, setImageUrl] = useState(article.imageUrl ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const imagePreviewUrlRef = useRef("");
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [author, setAuthor] = useState(article.author);
  const [category, setCategory] = useState<Article["category"]>(
    article.category,
  );
  const [status, setStatus] = useState<Article["status"]>(article.status);

  const [isSaving, setIsSaving] = useState(false);
  const [isBodyImageUploading, setIsBodyImageUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const previewImageUrl = imagePreviewUrl || imageUrl;

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
    setShouldRemoveImage(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setErrorMessage("");

      if (isBodyImageUploading) {
        setErrorMessage(
          "Please wait for body images to finish uploading before saving.",
        );
        return;
      }

      if (imageFile && !user) {
        setErrorMessage("You must be logged in to upload a replacement image.");
        return;
      }

      const originalImageUrl = article.imageUrl ?? "";
      let nextImageUrl: string | null | undefined;

      if (imageFile && user) {
        nextImageUrl = await uploadImage(imageFile, {
          folder: "articles",
          userId: user.uid,
        });
      } else if (shouldRemoveImage) {
        nextImageUrl = null;
      } else if (imageUrl) {
        nextImageUrl = imageUrl;
      }

      await updateArticleById(article.id, {
        title,
        slug,
        content,
        imageUrl: nextImageUrl,
        author,
        category,
        status,
      });

      if (
        originalImageUrl &&
        (shouldRemoveImage ||
          (nextImageUrl && nextImageUrl !== originalImageUrl))
      ) {
        await deleteImageByUrl(originalImageUrl);
      }

      router.push("/dashboard/articles");
      router.refresh();
    } catch (error) {
      console.error("Failed to update article:", error);
      setErrorMessage("Unable to save the article.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit article</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>

          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-medium">
            Slug
          </label>

          <input
            id="slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-1 block text-sm font-medium">
            Author
          </label>

          <input
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="imageFile" className="mb-1 block text-sm font-medium">
            Featured Image
          </label>

          {previewImageUrl && !shouldRemoveImage ? (
            <div className="relative h-56 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <Image
                src={previewImageUrl}
                alt={title}
                unoptimized={Boolean(imagePreviewUrl)}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              No featured image selected.
            </div>
          )}

          <input
            key={fileInputKey}
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              handleImageFileChange(file);
            }}
            className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
          />

          {imageFile && (
            <p className="text-sm text-slate-500">
              Replacement image: {imageFile.name}
            </p>
          )}

          {(imageUrl || imageFile) && (
            <button
              type="button"
              onClick={() => {
                setImageUrl("");
                setImageFile(null);
                clearPreviewImage();
                setShouldRemoveImage(true);
                setFileInputKey((currentKey) => currentKey + 1);
              }}
              disabled={isSaving}
              className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
            >
              Remove image
            </button>
          )}
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as Article["category"])
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="Create">Create</option>
            <option value="Work">Work</option>
            <option value="Grow">Grow</option>
            <option value="Think">Think</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as Article["status"])
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium">
            Content
          </label>

          <RichTextEditor
            value={content}
            onChange={setContent}
            userId={user?.uid}
            onImageUploadChange={setIsBodyImageUploading}
          />
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving || isBodyImageUploading}
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {isBodyImageUploading
              ? "Uploading image..."
              : isSaving
                ? "Saving..."
                : "Save changes"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSaving}
            className="rounded-md border border-slate-300 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
