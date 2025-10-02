"use client";
import { useAxios } from "@/hooks/useAxios";

export default function TrendingNews() {
  const { data, loading, error } = useAxios("/api/news?q=oil OR gas OR OPEC&pageSize=5");

  if (loading) return <p className="text-center">Loading news...</p>;
  if (error) return <p className="text-center text-red-500">Error loading news</p>;

  type Article = {
    title: string;
    description?: string;
    url: string;
    source?: string;
    publishedAt?: string;
  };
  const articles: Article[] = (data as { articles?: Article[] } | null)?.articles ?? [];

  return (
    <section className="mt-10 mb-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🔥 Trending News</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {articles.map((article, i) => (
          <div
            key={i}
            className="min-w-[300px] bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-md font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {article.description || "No summary available."}
              </p>
            </div>
            <div className="px-4 py-3 border-t text-sm text-gray-500 flex justify-between items-center">
              <span>{article.source || "Unknown source"}</span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                Read →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
