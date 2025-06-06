import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Replace with your actual authentication logic
  const isAuthenticated = true; // This is a placeholder

  if (!isAuthenticated) {
    return <Navigate to="/branch-login/:branchId" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;