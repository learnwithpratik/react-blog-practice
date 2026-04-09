import { RiEdit2Line, RiMoonLine } from "@remixicon/react";
import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);

    localStorage.removeItem("loggedInUser");
    // localStorage.removeItem("registeredUser");

    alert("Logged out successfully");
    navigate("/login");
  };
  return (
    <div className="w-full bg-white text-black flex items-center justify-between px-52 py-2 border-b border-b-gray-300">
      <div className="p-3 flex items-center justify-center gap-2">
        <NavLink to="/" className="flex items-center justify-center gap-1">
          <RiEdit2Line className="text-blue-600 drop-shadow-blue-600" />
          <h1 className="text-2xl font-bold font-lexmd">Inkwell</h1>
        </NavLink>
      </div>

      <div className="p-3 flex items-center justify-center font-lexreg gap-6 text-white">
        <button className="text-black">
          <RiMoonLine />
        </button>
        <div className="flex gap-2">
          {!loggedInUser ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1 bg-black text-white rounded-md"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-4 py-1 bg-blue-600 rounded-md"
              >
                SignUp
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-black">Welcome, {loggedInUser.name}</p>

              {/* 🔥 Show only for Author */}
              {loggedInUser.role === "Author" && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-1 bg-blue-600 text-white rounded-md"
                >
                  Dashboard
                </button>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
