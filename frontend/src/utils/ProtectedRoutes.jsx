import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("data");

  return JSON.parse(token)?.uniqueId ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoutes;
