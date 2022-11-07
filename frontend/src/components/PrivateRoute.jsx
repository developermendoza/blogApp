import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  if (!user.isAuthenticated) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
