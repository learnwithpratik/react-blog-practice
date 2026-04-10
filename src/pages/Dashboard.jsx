import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RiDeleteBinLine, RiPencilFill, RiPencilLine } from "@remixicon/react";
import BlogForm from "../components/BlogForm";

const Dashboard = () => {
  const { loggedInUser } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // 🔥 Load ONLY logged-in user's blogs
  useEffect(() => {
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const myBlogs = allBlogs.filter((b) => {
      // ✅ Support both new + old data
      if (b.authorEmail) {
        return b.authorEmail.toLowerCase() === loggedInUser.email.toLowerCase();
      }

      // fallback for old blogs
      return b.author === loggedInUser.name;
    });

    setBlogs(myBlogs);
  }, [loggedInUser]);

  // 🔥 After new blog created
  const handleAddSuccess = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
    setShowForm(false);
  };

  // 🔥 Delete blog (safe)
  const deleteBlog = (id) => {
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const blogToDelete = allBlogs.find((b) => b.id === id);

    if (
      blogToDelete.authorEmail &&
      blogToDelete.authorEmail !== loggedInUser.email
    ) {
      return toast.danger("Unauthorized");
    }

    const updated = allBlogs.filter((b) => b.id !== id);

    localStorage.setItem("blogs", JSON.stringify(updated));

    setBlogs((prev) => prev.filter((b) => b.id !== id));
    
  };
  return (
    <div className="w-full min-h-screen bg-gray-50  px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">

      {/* 🔥 Top Section */}
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md w-full sm:w-auto"
        >
          {showForm ? "Cancel" : "Add Blog"}
        </button>

        {showForm && <BlogForm onSuccess={handleAddSuccess} />}
      </div>

      {/* 🔥 Articles List */}
      <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-black">
          Your Articles
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No articles yet.
          </p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-zinc-600/5  flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3"
              >

                {/* 📝 Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                    {blog.excerpt ||
                      blog.content?.slice(0, 100) + "..."}
                  </p>
                </div>

                {/* 🔧 Actions */}
                <div className="flex gap-3 items-center justify-end sm:justify-start">
                  <button className="text-blue-600 text-lg">
                    <RiPencilLine />
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-500 text-lg"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
