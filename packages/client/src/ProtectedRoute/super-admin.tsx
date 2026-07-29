import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../lib/auth-client";

export const SuperAdminProtection = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return null;

  //   if (session?.user.role !== "super-admin") return <Navigate to="/" />;

  return <Outlet />;
};

export default SuperAdminProtection;
