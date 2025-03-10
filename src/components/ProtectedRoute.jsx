import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth_token"); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
