import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Auth from "../components/layouts/auth";
import { authClient } from "../lib/auth-client";
import { useSession } from "../lib/auth-client";
import { useState } from "react";

const SignInPage = () => {
  const { data: session, isPending } = useSession();
  const [loading, setIsLoading] = useState(false);
  const nav = useNavigate();
  console.log("sign");

  if (isPending) return;

  if (session) return <Navigate to="/" />;

  const signUp = async () => {
    try {
      await authClient.signIn.email(
        {
          email: "sammynavarro001@gmail.com",
          password: "sammy_12345",
          // name: "sammy navarro",
        },

        {
          onSuccess: (ctx) => {
            nav("/");
          },
          onRequest(ctx) {
            setIsLoading(true);
          },
          onError(ctx) {
            alert("invalid email and password");
          },
        },
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Auth>
      <div>
        <button
          disabled={loading}
          className={`w-52 h-10 bg-red-200 ${loading && "bg-yellow-300"}`}
          onClick={signUp}
        >
          {loading ? " loading..." : "Sign In"}
        </button>
      </div>
      {/* <AuthForm /> */}
    </Auth>
  );
};

export default SignInPage;
