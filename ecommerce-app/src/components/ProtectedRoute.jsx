import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../pages/Login";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const data = sessionStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) {
    return <Login redirectTo={location.pathname} inline />;
  }

  return children;
}
