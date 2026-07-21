import { createFactory } from "hono/factory";
import { BINDINGS } from "../types/factory";
import { Resend } from "resend";
import { createDB } from "../lib/db";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";

export const factory = createFactory<BINDINGS>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const db = createDB({ databaseUrl: env(c).DATABASE_URL });

      c.set("db", db);

      await next();
    });
    app.use(async (c, next) => {
      const resend = new Resend(env(c).RESEND_API_KEY);

      c.set("resend", resend);

      await next();
    });
    app.use(async (c, next) => {
      const auth = c.var.auth;

      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      });

      if (!session) {
        throw new HTTPException(401, { message: "Authentication required" });
      }

      c.set("authUser", session.user);
      c.set("authSession", session);

      await next();
    });
  },
});
