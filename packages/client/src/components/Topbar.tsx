import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession, signOut } from "../lib/auth-client";
import { cx } from "../lib/cx";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Bin nearly full", desc: "Recyclables bin at 92% capacity.", time: "2m ago", unread: true },
  { id: "n2", title: "Arm calibration done", desc: "Robotic arm #2 recalibrated successfully.", time: "1h ago", unread: true },
  { id: "n3", title: "New user added", desc: "operator@wm.com joined the workspace.", time: "3h ago", unread: true },
  { id: "n4", title: "Weekly report ready", desc: "Segregation summary is available.", time: "1d ago", unread: false },
];

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { data } = useSession();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<"profile" | "notifications" | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const wrapRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const initials = data?.user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  useEffect(() => {
    if (!menu) return;
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenu(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  async function handleSignOut() {
    setMenu(null);
    await signOut();
    navigate("/sign-in");
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4" ref={wrapRef}>
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenu((m) => (m === "notifications" ? null : "notifications"))}
            aria-haspopup="menu"
            aria-expanded={menu === "notifications"}
            className="relative size-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <Bell className="size-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-3.5 h-3.5 px-0.5 rounded-full bg-red-500 text-white text-[9px] leading-[14px] text-center">
                {unreadCount}
              </span>
            )}
          </button>

          {menu === "notifications" && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">Notifications</p>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-slate-400 text-center">
                    You're all caught up.
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cx(
                        "flex gap-2.5 px-4 py-3 border-b border-slate-50 last:border-0",
                        n.unread && "bg-emerald-50/50",
                      )}
                    >
                      <span
                        className={cx(
                          "mt-1.5 size-2 rounded-full shrink-0",
                          n.unread ? "bg-emerald-500" : "bg-transparent",
                        )}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenu((m) => (m === "profile" ? null : "profile"))}
            aria-haspopup="menu"
            aria-expanded={menu === "profile"}
            className="flex items-center gap-2 pl-3 border-l border-slate-200 rounded-lg py-1 pr-1 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <div className="size-8 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center">
              {initials}
            </div>
            <span className="text-sm font-medium text-slate-700">
              {data?.user.name}
            </span>
            <ChevronDown
              className={cx(
                "size-3.5 text-slate-400 transition-transform",
                menu === "profile" && "rotate-180",
              )}
            />
          </button>

          {menu === "profile" && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg py-1 z-50"
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {data?.user.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {data?.user.email}
                </p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenu(null);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <SettingsIcon className="size-4" />
                Settings
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
