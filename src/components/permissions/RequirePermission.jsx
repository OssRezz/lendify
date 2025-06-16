import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

const RequirePermission = ({ permission }) => {
  const { user } = useAuth();
  const location = useLocation();

  const hasPermission = user?.permissions?.includes(permission);

  if (!hasPermission) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequirePermission;
