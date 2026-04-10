import { RiCloseLine, RiEdit2Line, RiMenuLine, RiMoonLine } from "@remixicon/react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);

    localStorage.removeItem("loggedInUser");
    // localStorage.removeItem("registeredUser");

    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
     <div className="w-full bg-white text-black border-b border-gray-300">

      {/* 🔥 Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-20 lg:px-52 py-3">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-1">
          <RiEdit2Line className="text-blue-600" />
          <h1 className="text-xl md:text-2xl font-bold">Inkwell</h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* <button>
            <RiMoonLine />
          </button> */}

          {!loggedInUser ? (
            <>
              <NavLink className="px-4 py-1 bg-black text-white rounded-md" to="/login">
                Login
              </NavLink>
              <NavLink className="px-4 py-1 bg-blue-600 text-white rounded-md" to="/signup">
                SignUp
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <p className="font-semibold capitalize">Welcome, {loggedInUser.name}</p>

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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl transition-all "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </div>

      {/* 🔥 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 border-t">

          {/* <button className="text-left">
            <RiMoonLine />
          </button> */}

          {!loggedInUser ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-2 bg-black text-white rounded-md text-center"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-center"
              >
                SignUp
              </NavLink>
            </>
          ) : (
            <>
              <p>Welcome, <span className="font-bold capitalize text-blue-600">{loggedInUser.name}</span></p>

              {loggedInUser.role === "Author" && (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Dashboard
                </button>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};


export default Navbar;
