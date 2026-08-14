import { env } from "../types/env";

export async function sendOtpEmail({
  env,
  to,
  subject,
  content,
}: {
  env: env;
  to: string;
  subject: string;
  content: string;
}) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Waste Management", email: env.EMAIL },
      to: [{ email: to }],
      subject: subject,
      htmlContent: content,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Brevo send failed: ${JSON.stringify(err)}`);
  }

  return res.json();
}
