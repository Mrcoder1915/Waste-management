import { createAuthClient } from "better-auth/react";
import { emailOTPClient, adminClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:8787",
  // Client and API are on different origins (5173 vs 8787). Without this the
  // browser won't send/store the session cookie, so the session is lost on a
  // new tab or refresh.
  fetchOptions: {
    credentials: "include",
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [emailOTPClient(), adminClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;

export type Session = typeof authClient.$Infer;
