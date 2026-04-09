import { RiCalendar2Line, RiUser3Line } from "@remixicon/react";
import React from "react";

const Articles = () => {
  let articles = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      description:
        "Learn how React Hooks can simplify your component logic and make your code more reusable.",
      author: "Sara Chan",
      publish_date: "02/04/2026",
      tags: ["React", "Javascript", "Web Development"],
    },
    {
      id: 2,
      title: "Getting Started with React Hooks",
      description:
        "Learn how React Hooks can simplify your component logic and make your code more reusable.",
      author: "Sara Chan",
      publish_date: "02/04/2026",
      tags: ["React", "Javascript", "Web Development"],
    },
    {
      id: 3,
      title: "Getting Started with React Hooks",
      description:
        "Learn how React Hooks can simplify your component logic and make your code more reusable.",
      author: "Sara Chan",
      publish_date: "02/04/2026",
      tags: ["React", "Javascript", "Web Development"],
    },
    
  ];
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl font-lexsb">Latest Articles</h1>
        <p className="text-gray-500 font-lexreg font-normal">3 articles</p>
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
            <h2 className="text-3xl font-semibold hover:text-blue-600 duration-300 cursor-pointer">{article.title}</h2>
            <p className="text-gray-500">{article.description}</p>
            <div className="flex items-center justify-between pt-3 border-t border-t-gray-500/40 mt-2">
              <p className="text-sm text-gray-600 flex items-center gap-1"><RiUser3Line className="w-4 h-4"/> By {article.author}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1"><RiCalendar2Line className="w-4 h-4"/> {article.publish_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
