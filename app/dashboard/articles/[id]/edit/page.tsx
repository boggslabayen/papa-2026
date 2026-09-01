import { notFound } from "next/navigation";

import { getArticleById } from "@/lib/firebase/articles";
import EditArticleForm from "./EditArticleForm";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return <EditArticleForm article={article} />;
}
