import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { ulid } from "ulid";

export const generateUlid = (prefix: string) => {
  return () => `${prefix}_${ulid()}`.toLowerCase();
};

// Initialize Neon connection
export const createDB = ({ databaseUrl }: { databaseUrl: string }) => {
  const sql = neon(databaseUrl);
  return drizzle(sql);
};
