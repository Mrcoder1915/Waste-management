import { Users, Ban, ShieldCheck, Trash2, UserCheck } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { StatCard } from "../../components/catalyst/card";
import { Panel } from "../../components/panel";
import { cx } from "../../lib/cx";
import { ACTIVITY, CHART_DATA } from "../../lib/mock-data";
import { TONE_ICON_BG } from "../../lib/tone-style";
import Topbar from "../../components/Topbar";
import { useSession } from "./session";

export default function Overview() {
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
                    <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
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
