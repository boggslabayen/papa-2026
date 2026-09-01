import ArticleForm from "@/components/ui/dashboard/ArticleForm";

export default function addArticle() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Article</h1>
      <ArticleForm />
    </main>
  );
}
