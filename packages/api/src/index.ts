import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "./lib/auth.ts"; // path to your auth file
import { cors } from "hono/cors";

const app = new Hono();
app.use(
  "/api/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:5173", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
app.get("/", (c) => c.text("Hello Node.jsss!"));

serve({
  fetch: app.fetch,
  port: 8787,
});
