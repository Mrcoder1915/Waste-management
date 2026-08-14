import { Navigate } from "react-router-dom";
import Auth from "../components/layouts/auth";
import { useSession } from "../lib/auth-client";
import { SignInForm } from "../components/sign-in";

const SignInPage = () => {
  const { data: session } = useSession();

  if (session) return <Navigate to="/" />;

  return (
    <Auth>
      <SignInForm />
    </Auth>
  );
};

export default SignInPage;
