import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function ProtectedRoute({ element }) {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
