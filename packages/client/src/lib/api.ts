const API_URL = "http://localhost:8787";

/** Invite a new user by email. Requires an authenticated admin session. */
export async function inviteUser(input: {
  name: string;
  email: string;
  role: string;
}) {
  const res = await fetch(`${API_URL}/api/users/invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || `Invite failed (${res.status})`);
  }

  return res.json();
}
