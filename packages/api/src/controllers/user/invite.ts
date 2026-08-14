import { factory } from "../../factory/factory.ts";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { sendOtpEmail } from "../../lib/email.ts";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Map the UI's display role -> the role string stored on the user record.
const ROLE_MAP: Record<string, string> = {
  "Super Admin": "super_admin",
  Admin: "admin",
  Operator: "operator",
};

export const userController = factory.createApp();

// POST /api/users/invite — create a user record and email them an invite.
// Auth is enforced by the factory's initApp (requires an authenticated session).
userController.post("/invite", async (c) => {
  const { name, email, role } = await c.req.json<{
    name: string;
    email: string;
    role?: string;
  }>();

  if (!name?.trim() || !email?.trim() || !EMAIL_RE.test(email)) {
    throw new HTTPException(400, {
      message: "A valid name and email are required.",
    });
  }

  if (!role) {
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const auth = c.var.auth;

  // Create the DB record. Login is via email OTP, so the password is a throwaway
  // value the invitee never uses. `headers` proves the caller is an admin.
  const created = await auth.api.createUser({
    body: {
      email: normalizedEmail,
      name: name.trim(),
      password: crypto.randomUUID() + crypto.randomUUID(),
      // The role column is free text; the cast only satisfies the admin
      // plugin's default "admin" | "user" typing.
      role: (ROLE_MAP[role ?? ""] || "operator") as "user",
    },
    headers: c.req.raw.headers,
  });

  // Send the invite email with a link to the sign-in page.
  const clientUrl = env(c).CLIENT_URL;
  const html = `
  <div style="width:100%;display:flex;justify-content:center;align-items:center;">
                        <div style="padding:10px; background-color: #00FF00; border-radius: 10px; display:flex; align-items:center; gap:10px;">
                          <h1 style="color: #001A00; margin:0; font-size:20px;">Waste Management</h1>
                        </div>
                      </div>
      <p>Hi ${name.trim()},</p>
      <p>You've been invited to join the Robotic Arm Dashboard.</p>
      <p><a href="${clientUrl}/sign-in">Sign in here</a> with this email address —
      we'll email you a one-time code to log in.</p>`;

  await sendOtpEmail({
    env: c.env,
    to: normalizedEmail,
    subject: "You've been invited to the Waste management",
    content: html,
  });

  return c.json({ user: created.user }, 201);
});
