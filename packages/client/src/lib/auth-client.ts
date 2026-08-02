import { createAuthClient } from "better-auth/react";
import { magicLinkClient, adminClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:8787",
  emailAndPassword: {
    enabled: true,
  },
  plugins: [magicLinkClient(), adminClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;

export type Session = typeof authClient.$Infer;
