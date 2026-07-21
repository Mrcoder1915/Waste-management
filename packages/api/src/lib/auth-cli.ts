import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDB } from "./db";
import { admin } from "better-auth/plugins";
import { config } from "dotenv";

config({ path: ".dev.vars" });

export const authCli = betterAuth({
  database: drizzleAdapter(
    createDB({ databaseUrl: process.env.DATABASE_URL! }),
    {
      provider: "pg",
    },
  ),
  plugins: [admin()],
});

export type AuthSession = typeof authCli.$Infer.Session;
