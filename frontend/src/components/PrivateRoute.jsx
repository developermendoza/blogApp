import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const authUser = localStorage.getItem("userAuth");

  if (!authUser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/" state={{ from: location }} />;
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
