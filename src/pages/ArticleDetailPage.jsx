import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  RiArrowLeftLine,
  RiUser3Line,
  RiCalendar2Line,
} from "@remixicon/react";
import ReactMarkdown from "react-markdown";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const found = storedBlogs.find((blog) => blog.id === id);

    setArticle(found);
  }, [id]);

  if (!article) {
    return (
      <div className="text-center mt-20 text-gray-500">Article not found</div>
    );
  }

  return (
     <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 py-6 sm:py-8 md:py-10">

      {/* 🔙 Back */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 hover:text-blue-600"
      >
        <RiArrowLeftLine /> Back
      </button>

      {/* 🏷️ Tags */}
      <div className="flex gap-2 flex-wrap mb-3 sm:mb-4">
        {article.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-300/10 border border-blue-600/30 hover:bg-blue-400/30 duration-300 cursor-pointer  px-2 py-1 rounded-full text-xs sm:text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 📝 Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4">
        {article.title}
      </h1>

      {/* 👤 Author + Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-gray-500 dark:text-gray-400 border-b border-gray-300 pb-3 sm:pb-4 mb-5 sm:mb-6">

        <p className="flex items-center gap-2 text-sm sm:text-gray-600 capitalize">
          <RiUser3Line /> {article.author}
        </p>

        <p className="flex items-center gap-2 text-sm sm:text-gray-600">
          <RiCalendar2Line />
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* 📄 Content */}
      <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
