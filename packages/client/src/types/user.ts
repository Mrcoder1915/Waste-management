import { Tone } from "../lib/tone-style";

export interface SessionUser {
  name: string;
  email: string;
  role: "super_admin" | "admin" | "operator" | "viewer";
}

export interface Session {
  data: { user: SessionUser };
  isPending: boolean;
}

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: string;
  roleTone: Tone;
  status: "Active" | "Banned" | "Invited";
  lastActive: string;
}
