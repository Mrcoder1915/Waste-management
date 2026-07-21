import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, admin } from "better-auth/plugins";
import * as schema from "../db/schema/schema.ts";
import { env } from "../types/env";
import { createDB } from "./db.ts";
import { Resend } from "resend";

export const createAuth = (env: env) => {
  const isProd = env.APP === "production" || env.APP === "development";
  const db = createDB({ databaseUrl: env.DATABASE_URL });
  const resend = new Resend(env.RESEND_API_KEY);
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: { ...schema },
    }),
    secret: env.AUTH_SECRET,
    baseUrl: env.AUTH_BASE_URL,
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID as string,
        clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    plugins: [
      admin(),
      magicLink({
        sendMagicLink: async ({ email, token, url, metadata }, ctx) => {},
      }),
    ],
    trustedOrigins: !isProd ? ["http://localhost:5173"] : [],
  });
};

export type Auth = ReturnType<typeof createAuth>;
