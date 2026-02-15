import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  console.log("ProtectedRoute - currentUser:", currentUser);
  console.log("ProtectedRoute - loading:", loading);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    console.log("No user, redirecting to login");
    return <Navigate to="/" />;
  }

  console.log("User authenticated, rendering children");
  return children;
};

export default ProtectedRoute;