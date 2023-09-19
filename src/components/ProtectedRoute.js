import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function ProtectedRoute({ element }) {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" />;
  } else {
    return element;
  }
}

export default ProtectedRoute;
