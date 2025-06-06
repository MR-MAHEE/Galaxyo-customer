import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  if (!localStorage.getItem("token")) {
    return <Navigate to="/branch-login/:branchId" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;