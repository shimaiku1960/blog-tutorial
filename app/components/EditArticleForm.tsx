"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type Article = {
  id: number;
  title: string;
  description: string;
};

const EditArticleForm = ({ article }: { article: Article }) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/articles/${article.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      toast.success("記事を更新しました");
      router.push("/");
    } else {
      toast.error("更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/articles/${article.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("記事を削除しました");
      router.push("/");
    } else {
      toast.error("削除に失敗しました");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
          {loading ? "更新中..." : "更新"}
        </button>
      </form>

      <button onClick={handleDelete} disabled={loading} className="bg-red-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50">
        削除
      </button>
    </>
  );
};

export default EditArticleForm;
