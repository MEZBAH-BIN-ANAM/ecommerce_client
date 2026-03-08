import { useAppContext } from "@/store/store";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { haveToken, loading } = useAppContext();
  const location = useLocation();

  if (loading) return null; 

  if (!haveToken) {
    // Save path to redirect after login
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
