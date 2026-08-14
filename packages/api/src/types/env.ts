export type env = {
  DATABASE_URL: string;
  AUTH_SECRET: string;
  AUTH_BASE_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  CLIENT_URL: string;
  APP: "production" | "development" | "local";
  BREVO_API_KEY: string;
  EMAIL: string;
};
