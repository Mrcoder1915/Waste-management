import { type LucideIcon } from "lucide-react";

export type PageId = "overview" | "users" | "logs";

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
}
