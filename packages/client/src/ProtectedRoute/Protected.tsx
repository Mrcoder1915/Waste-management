import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../lib/auth-client";

const Protected = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return null;

  if (!session) return <Navigate to="/sign-in" />;

  return <Outlet />;
};

export default Protected;
