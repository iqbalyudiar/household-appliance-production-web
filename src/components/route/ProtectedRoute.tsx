import React from "react";
import { Navigate } from "react-router-dom";
import { STORAGE_AUTH_TOKEN } from "../../features/auth/constant";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem(STORAGE_AUTH_TOKEN);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
