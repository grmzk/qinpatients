import { Navigate, Outlet } from "react-router";

import { useAuth } from "../providers/AuthProvider";

function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
