"use client";

import type { Editor } from "@tiptap/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "@tiptap/extension-image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { useRef, useState } from "react";

import { uploadImage } from "@/lib/firebase/uploadImage";

const MAX_EDITOR_IMAGE_SIZE = 3 * 1024 * 1024;

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  userId?: string;
  onImageUploadChange?: (isUploading: boolean) => void;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  title,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      className={`px-3 py-1.5 rounded text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        isActive
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 rounded text-sm font-medium bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200 transition-colors"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  userId,
  onImageUploadChange,
}: RichTextEditorProps) {
  const editorRef = useRef<Editor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadMessage, setUploadMessage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  function setEditorImageUploading(isUploading: boolean) {
    setIsUploadingImage(isUploading);
    onImageUploadChange?.(isUploading);
  }

  function getImageFiles(fileList?: FileList | null) {
    if (!fileList) return [];

    return Array.from(fileList).filter((file) =>
      file.type.startsWith("image/"),
    );
  }

  function insertImage(src: string, alt: string, position?: number) {
    const currentEditor = editorRef.current;

    if (!currentEditor) return;

    if (typeof position === "number") {
      currentEditor
        .chain()
        .focus()
        .insertContentAt(position, {
          type: "image",
          attrs: {
            src,
            alt,
          },
        })
        .run();

      onChange(currentEditor.getHTML());
      return;
    }

    currentEditor.chain().focus().setImage({ src, alt }).run();

    onChange(currentEditor.getHTML());
  }

  async function uploadAndInsertImages(files: File[], position?: number) {
    if (!userId) {
      setUploadMessage("You must be logged in to add images.");
      return;
    }

    const oversizedFile = files.find(
      (file) => file.size > MAX_EDITOR_IMAGE_SIZE,
    );

    if (oversizedFile) {
      setUploadMessage("Images must be 3 MB or smaller.");
      return;
    }

    try {
      setEditorImageUploading(true);
      setUploadMessage("Uploading image...");

      for (const file of files) {
        const imageUrl = await uploadImage(file, {
          folder: "articles",
          userId,
        });

        insertImage(imageUrl, file.name, position);
      }

      setUploadMessage("");
    } catch (error) {
      console.error("Failed to upload editor image:", error);

      setUploadMessage("Unable to upload image. Please try again.");
    } finally {
      setEditorImageUploading(false);
    }
  }

  function handleImageInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = getImageFiles(event.target.files);

    void uploadAndInsertImages(files);

    event.target.value = "";
  }

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,

      TextStyle,

      Image.configure({
        allowBase64: false,
        inline: false,
      }),
    ],

    content: value,

    onCreate: ({ editor }) => {
      editorRef.current = editor;
    },

    onDestroy: () => {
      editorRef.current = null;
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      handlePaste: (_view, event) => {
        const files = getImageFiles(event.clipboardData?.files);

        if (files.length === 0) {
          return false;
        }

        event.preventDefault();

        void uploadAndInsertImages(files);

        return true;
      },

      handleDrop: (view, event) => {
        const files = getImageFiles(event.dataTransfer?.files);

        if (files.length === 0) {
          return false;
        }

        event.preventDefault();

        const position = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;

        void uploadAndInsertImages(files, position);

        return true;
      },
    },
  });

  if (!editor) {
    return <div className="p-4 text-slate-500">Loading editor...</div>;
  }

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-300 p-3 flex flex-wrap gap-2">
        {/* Heading Selection */}
        <ToolbarSelect
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
                ? "h2"
                : editor.isActive("heading", { level: 3 })
                  ? "h3"
                  : editor.isActive("heading", { level: 4 })
                    ? "h4"
                    : editor.isActive("heading", { level: 5 })
                      ? "h5"
                      : editor.isActive("heading", { level: 6 })
                        ? "h6"
                        : "paragraph"
          }
          onChange={(value) => {
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();

              return;
            }

            const level = parseInt(value.replace("h", "")) as
              | 1
              | 2
              | 3
              | 4
              | 5
              | 6;

            editor.chain().focus().toggleHeading({ level }).run();
          }}
          options={[
            {
              label: "Paragraph",
              value: "paragraph",
            },
            {
              label: "Heading 1",
              value: "h1",
            },
            {
              label: "Heading 2",
              value: "h2",
            },
            {
              label: "Heading 3",
              value: "h3",
            },
            {
              label: "Heading 4",
              value: "h4",
            },
            {
              label: "Heading 5",
              value: "h5",
            },
            {
              label: "Heading 6",
              value: "h6",
            },
          ]}
        />

        {/* Text formatting */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <strong>B</strong>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <em>I</em>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          >
            <u>U</u>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            <s>S</s>
          </ToolbarButton>
        </div>

        {/* Lists */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            • List
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            1. List
          </ToolbarButton>
        </div>

        {/* Undo / redo */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            isActive={false}
          >
            ↶ Undo
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            isActive={false}
          >
            ↷ Redo
          </ToolbarButton>
        </div>

        {/* Image upload */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            isActive={false}
            disabled={isUploadingImage}
            title="Insert image"
            ariaLabel="Insert image"
          >
            <FontAwesomeIcon icon={faImage} className="h-4 w-4" aria-hidden />
          </ToolbarButton>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageInputChange}
          />
        </div>
      </div>

      {/* Upload message */}
      {uploadMessage && (
        <p className="border-b border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
          {uploadMessage}
        </p>
      )}

      {/* Editor */}
      <div className="p-4 min-h-80 max-h-96 overflow-y-auto bg-white">
        <EditorContent
          editor={editor}
          className="
            prose
            prose-sm
            max-w-none
            **:font-inherit
            [&_img]:my-4
            [&_img]:max-h-96
            [&_img]:w-full
            [&_img]:rounded-md
            [&_img]:object-cover
            [&_ol]:list-decimal
            [&_ul]:list-disc
            [&_ol_li]:ml-5
            [&_ul_li]:ml-5
            [&_h1]:text-2xl
            [&_h1]:font-bold
            [&_h2]:text-xl
            [&_h2]:font-bold
            [&_h3]:text-lg
            [&_h3]:font-bold
            [&_h4]:text-base
            [&_h4]:font-bold
            [&_h5]:text-sm
            [&_h5]:font-bold
            [&_h6]:text-xs
            [&_h6]:font-bold
            [&_p]:text-base
            [&_p]:leading-6
          "
        />
      </div>
    </div>
  );
}
