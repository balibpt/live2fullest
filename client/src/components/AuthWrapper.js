// AuthWrapper.js
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const { currentUser, loading } = useContext(UserContext);

  if (loading) {
    // Authentication state is still being determined
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (!currentUser) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default AuthWrapper;
