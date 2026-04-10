import { RiEdit2Line } from "@remixicon/react";
import React from "react";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { registeredUser, setLoggedInUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const registeredUser =
      JSON.parse(localStorage.getItem("registeredUser")) || [];

    const user = registeredUser?.find(
      (u) => u.email === data.email && u.password === data.password,
    );

    if (!user) {
      toast.error("Invalid email or password");
      reset();
      return;
    }

    setLoggedInUser(user);
    console.log(user.role);
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // 🔥 Redirect based on role
    if (user.role === "Author") {
      navigate("/dashboard");
    } else {
      navigate("/reader");
    }
    toast.success("Login Successful");
    // navigate("/");
  };

  return (
    <>
      <div className="w-full min-h-screen bg-blue-100/10 px-4 sm:px-6 md:px-0 py-10 sm:py-16 md:pt-32">
  
  <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
    
    <div className="flex flex-col items-center justify-center border rounded-xl border-gray-500/20 px-4 sm:px-8 md:px-16 lg:px-32 py-4 sm:py-5">
      
      {/* 🔷 Icon */}
      <div className="bg-blue-600 p-3 sm:p-4 rounded-full">
        <RiEdit2Line className="text-white text-lg sm:text-xl drop-shadow-blue-600" />
      </div>

      {/* 🧾 Heading */}
      <div className="flex flex-col text-center mt-2">
        <h1 className="text-xl sm:text-2xl font-lexsb">
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm font-lexreg text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      {/* 📥 Form */}
      <div className="w-full p-2 sm:p-3">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input
              {...register("email", { required: "email is required" })}
              className="border border-zinc-600 rounded-sm p-2 text-sm sm:text-base"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm">Password</label>
            <input
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="border border-zinc-600 rounded-sm p-2 text-sm sm:text-base"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col">
            <button className="p-2 sm:p-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-md">
              Sign In
            </button>
          </div>

          {/* Footer */}
          <div>
            <p className="text-center text-xs sm:text-sm flex items-center justify-center gap-1 flex-wrap">
              Don't have an account?
              <NavLink to="/signup">
                <span className="text-blue-600">Sign Up</span>
              </NavLink>
            </p>
          </div>

        </form>
      </div>

    </div>
  </div>
</div>
    </>
  );
};

export default Login;
