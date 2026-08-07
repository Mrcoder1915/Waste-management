import { LayoutGrid, Users, FileText, LogOut, Recycle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cx } from "../../lib/cx";
import { NavItem } from "../../types/nav";
import { useSession, signOut } from "../../Pages/super-admin/session";

const NAV: NavItem[] = [
  { label: "Overview", icon: LayoutGrid, to: "/super-admin", end: true },
  { label: "User Management", icon: Users, to: "/super-admin/users" },
  { label: "Activity Logs", icon: FileText, to: "/super-admin/logs" },
];

export default function SuperAdminSidebar() {
  const { data } = useSession();

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col text-white bg-gradient-to-b from-[#07160F] to-[#0C2A1C]">
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
            <Recycle className="size-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">
              Waste Management
            </p>
            <p className="text-[11px] text-white/40 leading-tight">
              Robotics Arm Segregation
            </p>
          </div>
        </div>
        <span className="inline-block mt-3 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold tracking-wide">
          {data.user.role === "super_admin"
            ? "SUPER ADMIN"
            : data.user.role.toUpperCase()}
        </span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-500/15 text-white"
                    : "text-white/70 hover:bg-white/5",
                )
              }
            >
              <Icon className="size-4.5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 border border-red-500/30 bg-red-500/10 hover:bg-red-500 hover:text-white hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-colors"
        >
          <LogOut className="size-4.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
