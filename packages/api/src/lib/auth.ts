import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, admin } from "better-auth/plugins";
import * as schema from "../db/schema/schema.ts";
import { env } from "../types/env";
import { createDB } from "./db.ts";
import { Resend } from "resend";
import { sendOtpEmail } from "./email.ts";

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
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    plugins: [
      admin(),
      emailOTP({
        disableSignUp: true,
        sendVerificationOTP: async ({ email, otp }) => {
          const html = `
                      <div style="width:100%;display:flex;justify-content:center;align-items:center;">
                        <div style="padding:10px; background-color: #00FF00; border-radius: 10px; display:flex; align-items:center; gap:10px;">
                          <h1 style="color: #001A00; margin:0; font-size:20px;">Waste Management</h1>
                        </div>
                      </div>
                      <p>Use the one-time code below to sign in to the Waste Management Dashboard:</p>
                      <p style="font-size:28px;font-weight:700;letter-spacing:6px;margin:16px 0;">${otp}</p>
                      <p>This code expires in a few minutes. If you didn't request it, you can ignore this email.</p>`;
          await sendOtpEmail({
            env: env,
            to: email,
            content: html,
            subject: "Your login code",
          });
        },
      }),
    ],
    trustedOrigins: !isProd ? ["http://localhost:5173"] : [],
  });
};

export type Auth = ReturnType<typeof createAuth>;
