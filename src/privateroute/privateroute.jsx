import { Navigate, useLocation } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
export function Privateroute({ children }) {
  // const loginstatus = false;
  const loginstatus = useSelector((state) => state.account.loginstatus);
  const location = useLocation();
  if (!loginstatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
