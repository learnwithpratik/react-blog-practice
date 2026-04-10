import { RiEdit2Line } from "@remixicon/react";
import React from "react";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const SignUp = () => {
  let navigate = useNavigate();
  let { registeredUser, setRegisteredUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = (data) => {
    let newUser = [...registeredUser, data];
    setRegisteredUser(newUser);
    localStorage.setItem("registereduser", JSON.stringify(newUser));
    navigate("/login");
    reset();
  };

  return (
    <>
      <div className="w-full min-h-screen bg-blue-100/10 px-4 sm:px-6 md:px-0 py-8 sm:py-12">
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
          <div className="flex flex-col items-center justify-center border rounded-xl border-gray-500/20 px-6 sm:px-10 md:px-16 lg:px-24 py-4 sm:py-6">
            {/* Logo */}
            <div className="bg-blue-600 p-3 sm:p-4 rounded-full">
              <RiEdit2Line className="text-white text-lg sm:text-xl drop-shadow-blue-600" />
            </div>

            {/* Heading */}
            <div className="flex flex-col text-center mt-3 sm:mt-4">
              <h1 className="text-xl sm:text-2xl font-lexsb">
                Today's your day
              </h1>
              <p className="text-xs sm:text-sm font-lexreg text-gray-400">
                Sign Up to share your knowledge
              </p>
            </div>

            {/* Form */}
            <div className="w-full p-2 sm:p-3 mt-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 sm:space-y-4"
              >
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-sm">Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="border border-zinc-600 rounded-sm p-2 text-sm sm:text-base"
                    type="text"
                    placeholder="Enter your Name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs sm:text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-sm">Email</label>
                  <input
                    {...register("email", { required: "email is needed" })}
                    className="border border-zinc-600 rounded-sm p-2 text-sm sm:text-base"
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs sm:text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-sm">Password</label>
                  <input
                    {...register("password", { required: "Password is must." })}
                    className="border border-zinc-600 rounded-sm p-2 text-sm sm:text-base"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-xs sm:text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-sm">Confirm Password</label>
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="border border-zinc-600 rounded-sm p-2 text-sm sm:text-base"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-sm">Select Role</label>
                  <select
                    className="w-full px-2 py-2 border border-zinc-800/80 rounded-md text-sm sm:text-base"
                    {...register("role", { required: "select role." })}
                  >
                    <option value="Reader">Reader</option>
                    <option value="Author">Author</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="flex flex-col">
                  <button
                    disabled={!isValid}
                    className="p-2.5 sm:p-2 bg-blue-600 text-white text-sm sm:text-base rounded-md disabled:opacity-50"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Footer */}
                <div>
                  <p className="text-center text-xs sm:text-sm flex flex-wrap items-center justify-center gap-1">
                    Already have an account?
                    <NavLink to="/login">
                      <span className="text-blue-600">Sign In</span>
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

export default SignUp;
