import Topbar from "../components/Topbar";
import { CardContainer, Card } from "../components/catalyst/card";
import { ChartContainer } from "../components/catalyst/chart";
import DashboardLayout from "../components/layouts/dashbord";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ItemContainer } from "../components/catalyst/container";
import { ProgressBar } from "../components/ProgressBar";
import { Subheading } from "../components/catalyst/heading";
import { Badge, IconBadge } from "../components/catalyst/badge";
import { Activity, Recycle, PieChart, Trash2, Leaf, Package } from "lucide-react";
import { cx } from "../lib/cx";

const data = [
  { name: "Jan", Biodegradable: 400, NonBiodegradable: 240, Residual: 110 },
  { name: "Feb", Biodegradable: 300, NonBiodegradable: 139, Residual: 500 },
  { name: "Mar", Biodegradable: 200, NonBiodegradable: 980, Residual: 229 },
  { name: "Apr", Biodegradable: 700, NonBiodegradable: 390, Residual: 200 },
  { name: "May", Biodegradable: 189, NonBiodegradable: 480, Residual: 218 },
  { name: "Jun", Biodegradable: 239, NonBiodegradable: 380, Residual: 250 },
];

// node chip + status-pill styles keyed to a tone
const FEED_STYLES = {
  green: { chip: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  blue:  { chip: "bg-blue-500",    pill: "bg-blue-50 text-blue-600",       dot: "bg-blue-500" },
  amber: { chip: "bg-amber-500",   pill: "bg-amber-50 text-amber-600",     dot: "bg-amber-500" },
  red:   { chip: "bg-red-500",     pill: "bg-red-50 text-red-600",         dot: "bg-red-500" },
} as const;

const activities: {
  id: number; item: string; type: string; time: string;
  status: string; tone: keyof typeof FEED_STYLES; statusTone: keyof typeof FEED_STYLES;
  icon: typeof Leaf;
}[] = [
  { id: 1, item: "Plastic Bottle", type: "Non-Biodegradable", time: "10:15", status: "Completed", tone: "blue",  statusTone: "green", icon: Package },
  { id: 2, item: "Banana Peel",    type: "Biodegradable",     time: "10:12", status: "Completed", tone: "green", statusTone: "green", icon: Leaf },
  { id: 3, item: "Styrofoam Cup",  type: "Residual",          time: "10:09", status: "Sorted",    tone: "amber", statusTone: "blue",  icon: Trash2 },
  { id: 4, item: "Aluminum Can",   type: "Non-Biodegradable", time: "10:05", status: "Completed", tone: "blue",  statusTone: "green", icon: Recycle },
  { id: 5, item: "Food Wrapper",   type: "Residual",          time: "10:01", status: "Rejected",  tone: "amber", statusTone: "red",   icon: Trash2 },
  { id: 6, item: "Cardboard Box",  type: "Biodegradable",     time: "09:57", status: "Completed", tone: "green", statusTone: "green", icon: Leaf },
  { id: 7, item: "Glass Jar",      type: "Non-Biodegradable", time: "09:52", status: "Sorted",    tone: "blue",  statusTone: "blue",  icon: Package },
  { id: 8, item: "Apple Core",     type: "Biodegradable",     time: "09:48", status: "Completed", tone: "green", statusTone: "green", icon: Leaf },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex w-full bg-gray-100 min-h-screen">
        <div className="flex-1 p-8">
          <Topbar
            title="Dashboard"
            subtitle="Welcome back, Admin! Here's your waste overview."
          />
          <CardContainer>
            <Card className="flex-col">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IconBadge icon={Activity} tone="green" />
                  <Subheading>System Status</Subheading>
                </div>
                <Badge tone="green" dot size="xl">
                  Active
                </Badge>
              </div>
            </Card>
            <Card className="flex-col">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IconBadge icon={Recycle} tone="purple" />
                  <Subheading>Total Segragated Today</Subheading>
                </div>
                <Badge tone="purple" dot size="xl">
                  1,245 Items
                </Badge>
              </div>
            </Card>
            <Card className="flex-col">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IconBadge icon={PieChart} tone="blue" />
                  <Subheading>Waste Breakdown</Subheading>
                </div>
                <Badge tone="green" dot size="md">
                  Biodegradable: 45%
                </Badge>
                <Badge tone="amber" dot size="md">
                  Non Bio 35%
                </Badge>
                <Badge tone="red" dot size="md">
                  Residual 25%
                </Badge>
              </div>
            </Card>
            <Card className="flex-col">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IconBadge icon={Trash2} tone="amber" />
                  <Subheading>Active Bins</Subheading>
                </div>
                <ProgressBar
                  label="Bio"
                  percentage={65}
                  colorClass="bg-green-500"
                />
                <ProgressBar
                  label="Non Bio"
                  percentage={82}
                  colorClass="bg-green-500"
                />
                <ProgressBar
                  label="Residual"
                  percentage={40}
                  colorClass="bg-yellow-500"
                />
              </div>
            </Card>
          </CardContainer>
          <CardContainer className="lg:grid-cols-2!">
            <ChartContainer>
              <Subheading>Todays Segragation Trends</Subheading>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    dy={10}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      padding: "10px",
                    }}
                  />

                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: "20px" }}
                  />
                  <Line
                    name="Biodegradable"
                    type="monotone"
                    dataKey="Biodegradable"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#10b981" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    name="Non Biodegrable"
                    type="monotone"
                    dataKey="NonBiodegradable"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#3b82f6" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    name="Residual"
                    type="monotone"
                    dataKey="Residual"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#f59e0b" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <ItemContainer className="flex-col p-5 bg-white">
              <div className="flex items-center justify-between mb-4">
                <Subheading>Recent Activity</Subheading>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>
              <ol className="relative h-100 overflow-y-auto pr-1">
                {activities.map((a, i) => {
                  const s = FEED_STYLES[a.tone];
                  const st = FEED_STYLES[a.statusTone];
                  const last = i === activities.length - 1;
                  return (
                    <li key={a.id} className="group relative flex gap-4 pb-5 last:pb-0">
                      {!last && (
                        <span className="absolute left-5 top-11 bottom-0 w-px bg-gray-200" />
                      )}
                      <div className={cx("z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-white ring-4 ring-white", s.chip)}>
                        <a.icon className="size-5" />
                      </div>
                      <div className="-mt-0.5 flex flex-1 items-start justify-between gap-3 rounded-xl px-3 py-1.5 transition-colors group-hover:bg-gray-50">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-800">{a.item}</p>
                          <p className="text-xs text-gray-400">{a.type}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="text-xs font-medium text-gray-400 tabular-nums">{a.time}</span>
                          <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", st.pill)}>
                            <span className={cx("size-1.5 rounded-full", st.dot)} />
                            {a.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </ItemContainer>
          </CardContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
