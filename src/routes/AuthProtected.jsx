import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const AuthProtected = ({allowedRoles}) => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }


  return <Outlet />;
};

export default AuthProtected;