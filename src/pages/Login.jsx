import { RiEdit2Line } from "@remixicon/react";
import React from "react";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

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
      alert("Invalid email or password");
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
    alert("Login Successful");
    // navigate("/");
  };

  return (
    <>
      <div className="w-full h-full bg-blue-100/10 p-12 pt-32">
        <div className="w-6/12 m-auto">
          <div className="flex flex-col items-center justify-center border rounded-xl border-gray-500/20 px-32 py-3 ">
            <div className=" bg-blue-600 p-4 rounded-full">
              <RiEdit2Line className="text-white drop-shadow-blue-600" />
            </div>
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-lexsb">Welcome Back</h1>
              <p className="text-sm font-lexreg  text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            <div className="w-full p-3">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4"
              >
                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    {...register("email", { required: "email is required" })}
                    className="border border-zinc-600 rounded-sm p-2"
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Password</label>
                  <input
                    {...register("password", {
                      required: "Password required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    className="border border-zinc-600 rounded-sm p-2"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <button className="p-2 bg-blue-600 text-white rounded-md">
                    Sign In
                  </button>
                </div>

                <div>
                  <p className="text-center text-sm flex items-center justify-center gap-1">
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
