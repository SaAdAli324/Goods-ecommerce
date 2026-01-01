import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenExpire } from "./TokenExpire";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token"); 
  const isExpired= TokenExpire(token)
  if (!token || isExpired) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
 return <Navigate to="/login" replace />;

  } 

  return <Outlet />;
};

export default ProtectedRoutes;
