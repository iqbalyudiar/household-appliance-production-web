import React from "react";
import { Navigate } from "react-router-dom";
import { STORAGE_AUTH_TOKEN } from "../../features/auth/constant";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem(STORAGE_AUTH_TOKEN);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
