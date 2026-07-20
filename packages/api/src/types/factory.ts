import { env } from "./env";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { Auth } from "../lib/auth";
import { AuthSession } from "../lib/auth-cli";
import { Resend } from "resend";

export type BINDINGS = {
  Bindings: Pick<
    env,
    | "DATABASE_URL"
    | "AUTH_SECRET"
    | "AUTH_BASE_URL"
    | "GOOGLE_CLIENT_ID"
    | "GOOGLE_CLIENT_SECRET"
    | "RESEND_API_KEY"
    | "APP"
  >;
  Variables: {
    db: NeonHttpDatabase;
    auth: Auth;
    authSession: AuthSession;
    authUser: AuthSession["user"];
    resend: Resend;
  };
};
