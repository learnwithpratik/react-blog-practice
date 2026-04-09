import { RiEdit2Line } from "@remixicon/react";
import React from "react";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const SignUp = () => {
  let navigate = useNavigate();
  let {registeredUser,setRegisteredUser} = useAuth();
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
           <div className="w-full h-full bg-blue-100/10 pt-12">
        <div className="w-6/12 m-auto">
          <div className="flex flex-col items-center justify-center border rounded-xl border-gray-500/20 px-32 py-3 ">
            <div className=" bg-blue-600 p-4 rounded-full">
              <RiEdit2Line className="text-white drop-shadow-blue-600" />
            </div>
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-lexsb">Today's your day</h1>
              <p className="text-sm font-lexreg  text-gray-400">
                Sign Up to share your knowledge
              </p>
            </div>

            <div className="w-full p-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="flex flex-col">
                  <label>Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="border border-zinc-600 rounded-sm p-2"
                    type="text"
                    placeholder="Enter your Name"
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    {...register("email", { required: "email is needed" })}
                    className="border border-zinc-600 rounded-sm p-2"
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Password</label>
                  <input
                    {...register("password", { required: "Password is must." })}
                    className="border border-zinc-600 rounded-sm p-2"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Confirm Password</label>
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="border border-zinc-600 rounded-sm p-2"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label>Select Role</label>
                  <select
                    className="w-full px-2 py-2 border border-zinc-800/80 rounded-md"
                    {...register("role", { required: "select role." })}
                  >
                    <option
                      className="border-b border-b-white bg-blue-600 rounded-lg text-white "
                      value="Reader"
                    >
                      Reader
                    </option>
                    <option
                      className="border-b border-b-white bg-blue-800 rounded-lg text-white "
                      value="Author"
                    >
                      Author
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <button
                    disabled={!isValid}
                    className="p-2 bg-blue-600 text-white rounded-md"
                  >
                    Sign Up
                  </button>
                </div>

                <div>
                  <p className="text-center text-sm flex items-center justify-center gap-1">
                    Already have an account?
                    <NavLink to="/signup">
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
