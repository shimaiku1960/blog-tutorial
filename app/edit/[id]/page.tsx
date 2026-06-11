import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import EditArticleForm from "@/app/components/EditArticleForm";

const EditArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
  });

  if (!article) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-6">記事を編集</h1>
      <EditArticleForm article={article} />
    </main>
  );
};

export default EditArticlePage;
