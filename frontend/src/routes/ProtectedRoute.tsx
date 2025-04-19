import { Navigate, Outlet } from "react-router";

import { useAuth } from "../contexts/AuthContextProvider";

function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
