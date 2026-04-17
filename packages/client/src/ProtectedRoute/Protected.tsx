import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/react";

const Protected = () => {
    const { user } = useUser();

    if(!user) return <Navigate to="/sign-in" />;

    return <Outlet />;
}

export default Protected
