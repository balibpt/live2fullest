// AuthWrapper.js
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const user = useContext(UserContext);

  if (user === undefined) {
    // Authentication state is still being determined
    return null;
  }

  if (!user) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default AuthWrapper;
