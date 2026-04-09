import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const { loggedInUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      tags: [],
    },
  });

    const tags = watch("tags"); // 👈 form-controlled tags

  const [blogs, setBlogs] = useState([]);

  

  // Load blogs
  useEffect(() => {
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const myBlogs = allBlogs.filter(
      (b) => b.authorEmail === loggedInUser.email,
    );

    setBlogs(myBlogs);
  }, []);

  // Submit blog
  const onSubmit = (data) => {
    if (loggedInUser.role !== "Author") {
      return alert("Unauthorized");
    }

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const newBlog = {
      id: Date.now().toString(),
      ...data,
      author: loggedInUser.name,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("blogs", JSON.stringify([newBlog, ...blogs]));

    alert("Article created successfully");
    reset();

    navigate("/");
  };

  const deleteBlog = (id) => {
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const updated = allBlogs.filter((b) => b.id !== id);

    localStorage.setItem("blogs", JSON.stringify(updated));

    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // 🔥 Handle tag input
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = e.target.value.trim();
      if (!value) return;

      if (tags.length >= 5) return;

      if (!tags.includes(value)) {
        setValue("tags", [...tags, value]);
      }

      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-sm">

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 mb-4"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-semibold mb-6">
          Create New Article
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Enter a compelling title..."
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Excerpt
            </label>
            <textarea
              {...register("excerpt")}
              placeholder="Write a brief summary of your article..."
              className="w-full border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              A short description that appears on the blog listing
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              placeholder="Write your article content here... (Markdown supported)"
              className="w-full border border-gray-300 rounded-md p-3 h-40 focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Supports Markdown: ## for headers, **bold**, *italic*, `code`
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>

            <input
              type="text"
              placeholder="Add tags (press Enter to add)"
              onKeyDown={handleTagKeyDown}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-gray-400 mt-1">
              Add up to 5 tags
            </p>

            <div className="flex gap-2 mt-2 flex-wrap">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  onClick={() => removeTag(tag)}
                  className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded cursor-pointer"
                >
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md"
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
