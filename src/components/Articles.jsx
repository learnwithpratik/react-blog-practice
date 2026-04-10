import {
  RiCalendar2Line,
  RiDeleteBinLine,
  RiUser3Line,
} from "@remixicon/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Articles = () => {
  let navigate = useNavigate();
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
    <div className="max-w-3xl mx-auto">
      {/* 🔥 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="font-semibold text-xl sm:text-2xl">Latest Articles</h1>

        <p className="text-gray-500 text-sm sm:text-md font-semibold ">
          {articles.length} articles
        </p>
      </div>

      {/* 🔥 Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-800/30 hover:border-blue-600 transition-all duration-300 p-4 rounded-lg flex flex-col gap-3 bg-white dark:bg-zinc-300/10"
          >
            {/* 🏷️ Tags */}
            <div className="flex gap-1 flex-wrap ">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300/10 border border-blue-600/30 hover:bg-blue-400/30 duration-300 cursor-pointer p-0.5 px-1 rounded-full text-xs sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 📝 Title */}
            <h2
              onClick={() => navigate(`/article/${article.id}`)}
              className="text-lg sm:text-xl md:text-2xl font-semibold hover:text-blue-600 transition cursor-pointer leading-snug"
            >
              {article.title}
            </h2>

            {/* 📄 Description */}
            <p className="text-gray-600 text-sm line-clamp-1">
              {article.description}
            </p>

            {/* 👤 Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-400/80 mt-2">
              <p className="text-xs sm:text-sm text-gray-600  flex items-center gap-1">
                <RiUser3Line className="w-4 h-4 " />
                {article.author}
              </p>

              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                <RiCalendar2Line className="w-4 h-4" />
                {article.publish_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
