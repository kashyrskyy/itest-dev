// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowAnonymous?: boolean; // Add flag for allowing anonymous access
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowAnonymous = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  // If user is anonymous and anonymous access is allowed, grant access
  if (user && user.isAnonymous && allowAnonymous) {
    return <>{children}</>;
  }

  // If user is not logged in or is anonymous for a restricted page, redirect to login
  return user ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;