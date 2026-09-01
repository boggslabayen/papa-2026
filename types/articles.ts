import { Timestamp } from "firebase/firestore";

export type Article = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  isFeatured?: boolean;
  author: string;
  category: "Create" | "Work" | "Grow" | "Think" | "Other";
  status: "draft" | "published";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
