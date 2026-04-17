import { SignIn, useUser } from "@clerk/react"
import { Navigate } from "react-router-dom";
import Auth from "../components/layouts/auth";

const SignInPage = () => {
  const {user} = useUser();

  if (user) return <Navigate to="/" />;

  return (
    <Auth>
        <SignIn/>
    </Auth>
  )
}

export default SignInPage
