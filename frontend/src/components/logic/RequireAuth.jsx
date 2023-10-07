import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const RequireAuth = ({ allowedUser }) => {
  const { auth, isAuth } = useAuth();
  const location = useLocation();
  return isAuth ? (
    auth.role == allowedUser ? (
      <Outlet />
    ) : (
      <Navigate to="/not-authorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/student/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
