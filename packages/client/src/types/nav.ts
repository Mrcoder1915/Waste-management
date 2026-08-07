import { type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  /** Route path for this nav item. */
  to: string;
  /** Match only the exact path (used for the index route). */
  end?: boolean;
}
