import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const BlogForm = () => {
  const { loggedInUser } = useAuth();
  let navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      author: "",
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
  }, [loggedInUser]);

  // Submit blog
  const onSubmit = (data) => {
    if (loggedInUser.role !== "Author") {
      return alert("Unauthorized");
    }

    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const newBlog = {
      id: Date.now().toString(),
      ...data,
      author: loggedInUser.name, // ✅ FIXED
      createdAt: new Date().toISOString(),
    };

    const updatedBlogs = [newBlog, ...allBlogs];

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    // ✅ Update UI instantly
    setBlogs((prev) => [newBlog, ...prev]);

    // alert("Article created successfully");
    toast.success("Blog Created Succesfully");
    reset();
    navigate("/");
    onSuccess(newBlog);
  };

  const deleteBlog = (id) => {
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const blogToDelete = allBlogs.find((b) => b.id === id);

    if (blogToDelete.authorEmail !== loggedInUser.email) {
      return alert("Unauthorized");
    }

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
      tags.filter((tag) => tag !== tagToRemove),
    );
  };
  return (
    <div className="px-4 sm:px-6 md:px-0 py-6 sm:py-8">
  <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
    
    {/* 🔙 Back */}
    <button
      onClick={() => navigate(-1)}
      className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4"
    >
      ← Back to Dashboard
    </button>

    {/* 🧾 Title */}
    <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
      Create New Article
    </h1>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      
      {/* Title */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1">
          Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Enter a compelling title..."
          className="w-full border border-gray-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1">
          Excerpt
        </label>
        <textarea
          {...register("excerpt")}
          placeholder="Write a brief summary of your article..."
          className="w-full border border-gray-300 rounded-md p-2.5 sm:p-3 h-20 sm:h-24 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
          A short description that appears on the blog listing
        </p>
      </div>

      {/* Content */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Write your article content here... (Markdown supported)"
          className="w-full border border-gray-300 rounded-md p-2.5 sm:p-3 h-32 sm:h-40 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
          Supports Markdown: ## for headers, **bold**, *italic*, `code`
        </p>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1">
          Tags
        </label>

        <input
          type="text"
          placeholder="Add tags (press Enter to add)"
          onKeyDown={handleTagKeyDown}
          className="w-full border border-gray-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
          Add up to 5 tags
        </p>

        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={i}
              onClick={() => removeTag(tag)}
              className="bg-blue-100 text-blue-600 px-2 py-1 text-[10px] sm:text-xs rounded cursor-pointer"
            >
              {tag} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-md"
      >
        Publish Article
      </button>
    </form>
  </div>
</div>
  );
};

export default BlogForm;
