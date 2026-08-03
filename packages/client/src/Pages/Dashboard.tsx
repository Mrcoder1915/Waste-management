import Topbar from "../components/Topbar";
import { CardContainer, Card } from "../components/catalyst/card";
import { ChartContainer } from "../components/catalyst/chart";
import DashboardLayout from "../components/layouts/dashbord";
import { useUser } from "@clerk/react";

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
import { Badge } from "../components/catalyst/badge";

const data = [
  { name: "Jan", Biodegradable: 400, NonBiodegradable: 240, Residual: 110 },
  { name: "Feb", Biodegradable: 300, NonBiodegradable: 139, Residual: 500 },
  { name: "Mar", Biodegradable: 200, NonBiodegradable: 980, Residual: 229 },
  { name: "Apr", Biodegradable: 700, NonBiodegradable: 390, Residual: 200 },
  { name: "May", Biodegradable: 189, NonBiodegradable: 480, Residual: 218 },
  { name: "Jun", Biodegradable: 239, NonBiodegradable: 380, Residual: 250 },
];

const Dashboard = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <DashboardLayout>
      <div className="flex w-full bg-gray-100 min-h-screen">
        <div className="flex-1 p-8">
          <Topbar
            title="Dashboard"
            subtitle="Welcome back, Admin! Here's your waste overview."
          />
          <CardContainer>
            <Card>
              <div>
                <Subheading>System Status</Subheading>
                <Badge tone="green" dot size="xl">
                  Active
                </Badge>
              </div>
            </Card>
            <Card>
              <div>
                <Subheading>Total Segragated Today</Subheading>
                <Badge tone="purple" dot size="xl">
                  1,245 Items
                </Badge>
              </div>
            </Card>
            <Card>
              <div>
                <Subheading>Waste Breakdown</Subheading>
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
                <Subheading>Active Bins</Subheading>
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
            <ItemContainer className="flex-col p-5 bg-white ">
              <Subheading>Recent Activity Feed</Subheading>
              <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow-sm h-100 overflow-y-auto [&>div]:w-full [&>div]:flex [&>div]:flex-row [&>div]:gap-4  [&>div]:m-auto [&>div]:p-3">
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
                <div>
                  <div className="pr-5 border-r-2 border-[rgba(0,0,0,.25)]">
                    10:15
                  </div>
                  <div>Plastic Bottle complete</div>
                </div>
              </div>
            </ItemContainer>
          </CardContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
