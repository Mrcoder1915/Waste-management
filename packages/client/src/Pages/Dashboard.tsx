import Topbar from "../components/Topbar";
import { FaLeaf, FaRecycle, FaTrash, FaChartPie } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
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
import { Container, ItemContainer } from "../components/catalyst/container";
import { ProgressBar } from "../components/ProgressBar";

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
          <Topbar />
          <CardContainer>
            <Card>
              <div>
                <h1 className="mb-4 font-semibold">System Status</h1>
                <h2 className="text-green-500 text-sm font-medium flex items-center gap-2">
                  <span>{<GoDotFill />}</span>Active
                </h2>
              </div>
            </Card>
            <Card>
              <div className={`text-2xl`}></div>
              <div>
                <h1 className="mb-4 font-semibold">Total Segragated Today</h1>
                <h2 className="text-6xl font-bold flex flex-col gap-2">
                  1,245 <span className="text-2xl font-normal">Items</span>
                </h2>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-2">
                <h1 className="mb-4 font-semibold">Waste Breakdown</h1>
                <h2 className="text-sm font-medium flex items-center gap-2">
                  {<GoDotFill className="text-green-500" />}Bio 45%
                </h2>
                <h2 className="text-sm font-medium flex items-center gap-2">
                  {<GoDotFill className="text-yellow-500" />} Non Bio 35%
                </h2>
                <h2 className="text-sm font-medium flex items-center gap-2">
                  {<GoDotFill className="text-red-500" />} Residual 25%
                </h2>
              </div>
            </Card>
            <Card className="flex-col">
              <div>
                <h1 className="mb-4 font-semibold">Active Bins</h1>
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
              <h2 className="mb-4 text-2xl font-semibold">
                Todays Segragation Trends
              </h2>
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
              <h1 className="mb-4 text-2xl font-semibold">
                Recent Activity Feed
              </h1>
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
