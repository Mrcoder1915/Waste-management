import { Session } from "../../types/user";

// TODO: replace with the real auth-client session once super-admin auth is wired.
export function useSession(): Session {
  return {
    data: {
      user: {
        name: "Super Admin",
        email: "superadmin@wm.com",
        role: "super_admin",
      },
    },
    isPending: false,
  };
}

export function signOut(): void {
  // authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/login") } })
  alert("authClient.signOut() would run here");
}
