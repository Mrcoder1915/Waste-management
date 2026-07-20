import { Hono } from "hono";
import { createAuth } from "./lib/auth.ts";
import { cors } from "hono/cors";
import { env } from "hono/adapter";
import { BINDINGS } from "./types/factory.ts";

const app = new Hono<BINDINGS>();
app.use(
  "/api/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  const authInstance = createAuth(env(c));
  c.set("auth", authInstance);
  await next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return c.var.auth.handler(c.req.raw);
});
app.onError((err, c) => {
  console.error(`[Server Error]: ${err}`);

  if (c.env.APP === "local") {
    return c.text(`Local Debug: ${err.message || String(err)}`, 500);
  }

  return c.text("Oops! Something went wrong on our end.", 500);
});
app.get("/", (c) => {
  return c.json("Hello Hono.jsss!");
});

export default app;
