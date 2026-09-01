import { Article } from "@/types/articles";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { deleteImageByUrl } from "./uploadImage";
import { db } from "./firestore";

type ArticleRecord = Article & { id: string };
type ArticleFormData = Pick<
  Article,
  "title" | "slug" | "content" | "author" | "category" | "status"
> & {
  imageUrl?: string;
};

export async function createArticle(article: ArticleFormData) {
  const docRef = await addDoc(collection(db, "articles"), {
    title: article.title,
    slug: article.slug,
    content: article.content,
    author: article.author,
    category: article.category,
    status: article.status,
    ...(article.imageUrl ? { imageUrl: article.imageUrl } : {}),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getArticles(): Promise<ArticleRecord[]> {
  const querySnapshot = await getDocs(collection(db, "articles"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Article, "id">),
  }));
}

export async function getArticleById(id: string): Promise<ArticleRecord | null> {
  const articleRef = doc(db, "articles", id);
  const articleSnapshot = await getDoc(articleRef);

  if (!articleSnapshot.exists()) {
    return null;
  }

  return {
    id: articleSnapshot.id,
    ...(articleSnapshot.data() as Omit<Article, "id">),
  };
}

export async function getArticlesByCategory(
  category: Article["category"]
): Promise<ArticleRecord[]> {
  const articlesRef = collection(db, "articles");

  const articlesQuery = query(
    articlesRef,
    where("category", "==", category)
  );

  const querySnapshot = await getDocs(articlesQuery);

  return querySnapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<Article, "id">),
    id: doc.id,
  }));
}

export async function deleteArticleById(id: string): Promise<void> {
  const articleRef = doc(db, "articles", id);
  const articleSnapshot = await getDoc(articleRef);

  if (articleSnapshot.exists()) {
    const article = articleSnapshot.data() as Article;
    await deleteImageByUrl(article.imageUrl);
  }

  await deleteDoc(articleRef);
}

export async function setFeaturedArticleByCategory(
  category: Article["category"],
  articleId: string,
): Promise<void> {
  const articlesRef = collection(db, "articles");
  const articlesQuery = query(articlesRef, where("category", "==", category));
  const querySnapshot = await getDocs(articlesQuery);
  const batch = writeBatch(db);

  querySnapshot.docs.forEach((articleDoc) => {
    batch.update(doc(db, "articles", articleDoc.id), {
      isFeatured: articleDoc.id === articleId,
      updatedAt: serverTimestamp(),
    });
  });

  await batch.commit();
}

type UpdateArticleData = Pick<
  Article,
  "title" | "slug" | "content" | "author" | "category" | "status"
> & {
  imageUrl?: string | null;
};

export async function updateArticleById(
  id: string,
  articleData: UpdateArticleData,
): Promise<void> {
  const articleRef = doc(db, "articles", id);
  const { imageUrl, ...articleFields } = articleData;

  await updateDoc(articleRef, {
    ...articleFields,
    ...(imageUrl === null
      ? { imageUrl: deleteField() }
      : imageUrl
        ? { imageUrl }
        : {}),
    updatedAt: serverTimestamp(),
  });
}
