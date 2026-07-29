import { useState, useMemo } from "react";
import {
  LayoutGrid,
  Users,
  FileText,
  LogOut,
  Bell,
  ChevronDown,
  Plus,
  SlidersHorizontal,
  Pencil,
  Ban,
  CheckCircle2,
  ShieldCheck,
  Trash2,
  Recycle,
  UserCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Button } from "../../components/catalyst/button";
import { StatCard } from "../../components/catalyst/card";
import { IconAction } from "../../components/catalyst/icon";
import { SearchInput } from "../../components/catalyst/input";
import { Panel } from "../../components/catalyst/panel";
import { Pagination } from "../../components/pagination";
import { Table } from "../../components/catalyst/table";
import { Badge } from "../../components/catalyst/badge";
import { cx } from "../../lib/cx";
import {
  LOGS,
  ACTION_TONE,
  ACTIVITY,
  USERS,
  CHART_DATA,
} from "../../lib/mock-data";
import { TONE_ICON_BG } from "../../lib/tone-style";
import { AppUser, Session } from "../../types/user";
import { NavItem, PageId } from "../../types/nav";
import { LogEntry } from "../../types/logs";

function useSession(): Session {
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

function signOut(): void {
  // authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/login") } })
  alert("authClient.signOut() would run here");
}

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "users", label: "User Management", icon: Users },
  { id: "logs", label: "Activity Logs", icon: FileText },
];

interface SidebarProps {
  active: PageId;
  onNavigate: (id: PageId) => void;
}

function Sidebar({ active, onNavigate }: SidebarProps) {
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
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-500/15 text-white"
                  : "text-white/70 hover:bg-white/5",
              )}
            >
              <Icon className="size-4.5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 transition-colors"
        >
          <LogOut className="size-4.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

interface TopbarProps {
  title: string;
  subtitle?: string;
}

function Topbar({ title, subtitle }: TopbarProps) {
  const { data } = useSession();
  const initials = data.user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative size-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100">
          <Bell className="size-4.5" />
          <span className="absolute top-1.5 right-1.5 size-3.5 rounded-full bg-red-500 text-white text-[9px] leading-[14px]">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="size-8 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center">
            {initials}
          </div>
          <span className="text-sm font-medium text-slate-700">
            {data.user.name}
          </span>
          <ChevronDown className="size-3.5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                           */
/* ------------------------------------------------------------------ */

function OverviewPage() {
  const { data } = useSession();
  return (
    <>
      <Topbar
        title="Overview"
        subtitle={`Welcome back, ${data.user.name}! Here's what's happening in your system.`}
      />

      <div className="grid grid-cols-5 gap-4 mb-5">
        <StatCard
          icon={Users}
          tone="purple"
          label="Total Users"
          value="156"
          sub="All registered users"
        />
        <StatCard
          icon={UserCheck}
          tone="blue"
          label="Active Users"
          value="132"
          sub="Currently active users"
        />
        <StatCard
          icon={Ban}
          tone="red"
          label="Banned Users"
          value="24"
          sub="Blocked from accessing"
        />
        <StatCard
          icon={ShieldCheck}
          tone="purple"
          label="Admin Roles"
          value="5"
          sub="System roles"
        />
        <StatCard
          icon={Trash2}
          tone="amber"
          label="Total Logs"
          value="1,250"
          sub="All system logs"
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Panel title="User Overview (Last 30 Days)" className="col-span-2">
          <div className="h-64 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={CHART_DATA}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  interval={1}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #E2E8F0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#16A34A"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#16A34A", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Recent Activity">
          <ul className="space-y-4">
            {ACTIVITY.map((a, i) => {
              const Icon = a.icon;
              return (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className={cx(
                      "size-8 rounded-lg flex items-center justify-center shrink-0",
                      TONE_ICON_BG[a.tone],
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700 leading-snug">
                      {a.text}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {a.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  User Management page                                                */
/* ------------------------------------------------------------------ */

function UserManagementPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo<AppUser[]>(
    () =>
      USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <Topbar
        title="User Management"
        subtitle="Manage and monitor all system users."
      />

      <Panel title="" className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <SearchInput
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex-1" />
          <Button variant="secondary">
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
          <Button>
            <Plus className="size-4" />
            Add User
          </Button>
        </div>

        <Table
          columns={[
            "ID",
            "Full Name",
            "Email",
            "Role",
            "Status",
            "Last Active",
            "Actions",
          ]}
        >
          {filtered.map((u) => (
            <tr
              key={u.id}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
            >
              <td className="py-3 px-5 text-slate-400">{u.id}</td>
              <td className="py-3 px-5 font-medium text-slate-800">{u.name}</td>
              <td className="py-3 px-5 text-slate-500">{u.email}</td>
              <td className="py-3 px-5">
                <Badge tone={u.roleTone}>{u.role}</Badge>
              </td>
              <td className="py-3 px-5">
                <Badge tone={u.status === "Active" ? "green" : "red"} dot>
                  {u.status}
                </Badge>
              </td>
              <td className="py-3 px-5 text-slate-400">{u.lastActive}</td>
              <td className="py-3 px-5">
                <div className="flex items-center gap-2">
                  <IconAction>
                    <Pencil className="size-3.5" />
                  </IconAction>
                  {u.status === "Active" ? (
                    <IconAction tone="red">
                      <Ban className="size-3.5" />
                    </IconAction>
                  ) : (
                    <IconAction tone="green">
                      <CheckCircle2 className="size-3.5" />
                    </IconAction>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1 to {filtered.length} of 156 users
          </p>
          <Pagination page={page} total={32} onChange={setPage} />
        </div>
      </Panel>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Activity Logs page                                                  */
/* ------------------------------------------------------------------ */

function ActivityLogsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo<LogEntry[]>(
    () =>
      LOGS.filter(
        (l) =>
          l.user.toLowerCase().includes(query.toLowerCase()) ||
          l.action.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <Topbar
        title="Activity Logs"
        subtitle="View all system activities and changes."
      />

      <Panel title="" className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <SearchInput
            placeholder="Search logs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex-1" />
          <Button variant="secondary">
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
        </div>

        <Table
          columns={["ID", "Time", "User", "Action", "Details", "IP Address"]}
        >
          {filtered.map((l) => (
            <tr
              key={l.id}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
            >
              <td className="py-3 px-5 text-slate-400">{l.id}</td>
              <td className="py-3 px-5 text-slate-500">{l.time}</td>
              <td className="py-3 px-5 font-medium text-slate-800">{l.user}</td>
              <td className="py-3 px-5">
                <Badge tone={ACTION_TONE[l.action] ?? "slate"}>
                  {l.action}
                </Badge>
              </td>
              <td className="py-3 px-5 text-slate-500">{l.details}</td>
              <td className="py-3 px-5 text-slate-400">{l.ip}</td>
            </tr>
          ))}
        </Table>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1 to {filtered.length} of 1,250 logs
          </p>
          <Pagination page={page} total={157} onChange={setPage} />
        </div>
      </Panel>
    </>
  );
}

export default function SuperAdmin() {
  const [active, setActive] = useState<PageId>("overview");

  return (
    <div
      className="flex min-h-screen bg-slate-50 text-[15px]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <Sidebar active={active} onNavigate={setActive} />
      <main className="flex-1 p-7 min-w-0">
        {active === "overview" && <OverviewPage />}
        {active === "users" && <UserManagementPage />}
        {active === "logs" && <ActivityLogsPage />}
      </main>
    </div>
  );
}
