import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import AuthProtedcted from "./AuthProtected";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MainLayout from "../layouts/MainLayout";
// import AuthProtedcted from "./AuthProtedcted";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },

        // Reader
        {
          element: <AuthProtedcted allowedRoles={["reader"]} />,
          children: [{ path: "reader", element: <Home /> }],
        },
        
        // Author only
        {
          element: <AuthProtedcted allowedRoles={["author"]} />,
          children: [
            { path: "dashboard", element:<Dashboard /> },
            
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
