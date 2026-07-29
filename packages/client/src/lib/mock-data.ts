import {
  KeyRound,
  LucideIcon,
  Pencil,
  Plus,
  UserCheck,
  UserX,
} from "lucide-react";
import { Tone } from "./tone-style";

interface ChartPoint {
  day: string;
  v: number;
}

interface ActivityItem {
  icon: LucideIcon;
  tone: Tone;
  text: string;
  time: string;
}

interface AppUser {
  id: number;
  name: string;
  email: string;
  role: string;
  roleTone: Tone;
  status: "Active" | "Banned";
  lastActive: string;
}

interface LogEntry {
  id: number;
  time: string;
  user: string;
  action: string;
  details: string;
  ip: string;
}

export const CHART_DATA: ChartPoint[] = [
  { day: "Apr 29", v: 32 },
  { day: "May 1", v: 45 },
  { day: "May 4", v: 38 },
  { day: "May 6", v: 52 },
  { day: "May 9", v: 48 },
  { day: "May 11", v: 61 },
  { day: "May 14", v: 70 },
  { day: "May 16", v: 58 },
  { day: "May 19", v: 65 },
  { day: "May 21", v: 55 },
  { day: "May 24", v: 68 },
  { day: "May 26", v: 74 },
  { day: "May 29", v: 80 },
];

export const ACTIVITY: ActivityItem[] = [
  {
    icon: UserCheck,
    tone: "blue",
    text: "User Maria Santos logged in",
    time: "May 29, 2024 10:30 AM",
  },
  {
    icon: UserX,
    tone: "red",
    text: "User John Dela Cruz was banned",
    time: "May 29, 2024 10:20 AM",
  },
  {
    icon: Plus,
    tone: "blue",
    text: "New user Michael John added",
    time: "May 29, 2024 09:45 AM",
  },
  {
    icon: Pencil,
    tone: "purple",
    text: "User Robert Anderson updated",
    time: "May 29, 2024 09:30 AM",
  },
  {
    icon: KeyRound,
    tone: "amber",
    text: "User Lisa Tan reset password",
    time: "May 29, 2024 09:15 AM",
  },
];

export const USERS: AppUser[] = [
  {
    id: 1,
    name: "John Dela Cruz",
    email: "john.d@wm.com",
    role: "Admin",
    roleTone: "green",
    status: "Active",
    lastActive: "May 29, 2024 10:30 AM",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.s@wm.com",
    role: "Operator",
    roleTone: "blue",
    status: "Active",
    lastActive: "May 29, 2024 09:15 AM",
  },
  {
    id: 3,
    name: "Robert Anderson",
    email: "robert.a@wm.com",
    role: "Viewer",
    roleTone: "purple",
    status: "Active",
    lastActive: "May 28, 2024 04:45 PM",
  },
  {
    id: 4,
    name: "Lisa Tan",
    email: "lisa.t@wm.com",
    role: "Operator",
    roleTone: "blue",
    status: "Banned",
    lastActive: "May 28, 2024 11:20 AM",
  },
  {
    id: 5,
    name: "Michael John",
    email: "michael.j@wm.com",
    role: "Admin",
    roleTone: "green",
    status: "Active",
    lastActive: "May 27, 2024 03:22 PM",
  },
];

export const LOGS: LogEntry[] = [
  {
    id: 1250,
    time: "May 29, 2024 10:30 AM",
    user: "Maria Santos",
    action: "Login",
    details: "User logged in successfully",
    ip: "192.168.1.100",
  },
  {
    id: 1249,
    time: "May 29, 2024 10:20 AM",
    user: "Super Admin",
    action: "Ban User",
    details: "Banned user: Lisa Tan",
    ip: "192.168.1.100",
  },
  {
    id: 1248,
    time: "May 29, 2024 09:45 AM",
    user: "Super Admin",
    action: "Add User",
    details: "Added new user: Michael John",
    ip: "192.168.1.100",
  },
  {
    id: 1247,
    time: "May 29, 2024 09:30 AM",
    user: "Super Admin",
    action: "Update User",
    details: "Updated user: Robert Anderson",
    ip: "192.168.1.100",
  },
  {
    id: 1246,
    time: "May 29, 2024 09:15 AM",
    user: "Super Admin",
    action: "Reset Password",
    details: "Reset password for: John Dela Cruz",
    ip: "192.168.1.100",
  },
  {
    id: 1245,
    time: "May 29, 2024 09:05 AM",
    user: "Maria Santos",
    action: "Update Role",
    details: "Updated role: Operator",
    ip: "192.168.1.100",
  },
  {
    id: 1244,
    time: "May 29, 2024 08:20 AM",
    user: "Super Admin",
    action: "Delete User",
    details: "Deleted user: sample.user@wm.com",
    ip: "192.168.1.100",
  },
  {
    id: 1243,
    time: "May 29, 2024 07:15 AM",
    user: "Maria Santos",
    action: "Logout",
    details: "User logged out",
    ip: "192.168.1.100",
  },
];

export const ACTION_TONE: Record<string, Tone> = {
  Login: "blue",
  Logout: "slate",
  "Ban User": "red",
  "Add User": "green",
  "Update User": "purple",
  "Reset Password": "amber",
  "Update Role": "purple",
  "Delete User": "red",
};
