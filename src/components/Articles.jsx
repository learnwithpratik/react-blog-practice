import { RiCalendar2Line, RiDeleteBinLine, RiUser3Line } from "@remixicon/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { loggedInUser } = useAuth();


  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const formatted = storedBlogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      description: blog.excerpt || blog.content?.slice(0, 120) + "...",
      tags: blog.tags || [],
      author: blog.author,
      publish_date: new Date(blog.createdAt).toLocaleDateString(),
    }));

    setArticles(formatted);
  }, []);

  // ✅ NOW check after state is set
  if (articles.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No articles yet. Be the first to publish!
      </p>
    );
  }

const handleDelete = (id) => {
  const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const blogToDelete = storedBlogs.find((b) => b.id === id);

  if (blogToDelete.authorEmail !== loggedInUser.email) {
    return alert("You can only delete your own blogs");
  }

  const updatedBlogs = storedBlogs.filter((blog) => blog.id !== id);

  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

  setArticles((prev) => prev.filter((article) => article.id !== id));
};
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl font-lexsb">Latest Articles</h1>
        <p className="text-gray-500 font-lexreg font-normal">
          {articles.length} articles
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-800/30 hover:border-blue-600 duration-400 p-4 rounded-lg flex flex-col gap-2"
          >
            <div className="flex gap-1 mt-2 flex-wrap">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-3xl font-semibold hover:text-blue-600 duration-300 cursor-pointer">
              {article.title}
            </h2>

            <p className="text-gray-500">{article.description}</p>

            <div className="flex items-center justify-between pt-3 border-t border-t-gray-500/40 mt-2">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <RiUser3Line className="w-4 h-4" /> By {article.author}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <RiCalendar2Line className="w-4 h-4" />
                {article.publish_date}
              </p>
            </div>

            <button
              onClick={() => handleDelete(article.id)}
              className="text-red-500 text-sm hover:underline"
            >
              <RiDeleteBinLine />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
