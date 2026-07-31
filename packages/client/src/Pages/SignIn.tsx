import { Navigate } from "react-router-dom";
import Auth from "../components/layouts/auth";
import { useSession } from "../lib/auth-client";
import { SignInForm } from "../components/sign-in";

const SignInPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return;

  if (session) return <Navigate to="/" />;

  return (
    <Auth>
      <SignInForm />
    </Auth>
  );
};

export default SignInPage;
