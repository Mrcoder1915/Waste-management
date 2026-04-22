import Topbar from "../components/Topbar";
import { FaLeaf, FaRecycle, FaTrash, FaChartPie } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { CardContainer, Card } from "../components/catalyst/card";
import { ChartContainer } from "../components/catalyst/chart";
import DashboardLayout from "../components/layouts/dashbord";
import { useUser } from "@clerk/react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Container, ItemContainer } from "../components/catalyst/container";
import { ProgressBar } from "../components/ProgressBar";

const data = [
  {
    name: "Page A",
    uv: 0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 9000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 6080,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 4090,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 10000,
    amt: 2100,
  },
];

const data1 = [
  {
    title: "Biodegradable",
    value: 580,
    icon: <FaLeaf />,
    color: "text-green-500",
  },
  {
    title: "Recyclable",
    value: 355,
    icon: <FaRecycle />,
    color: "text-blue-500",
  },
  {
    title: "Residual",
    value: 235,
    icon: <FaTrash />,
    color: "text-yellow-500",
  },
  {
    title: "Total Waste",
    value: 1170,
    icon: <FaChartPie />,
    color: "text-purple-500",
  },
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
              <AreaChart
                style={{
                  width: "100%",
                  height: "90%",
                  aspectRatio: 1.618,
                }}
                responsive
                data={data}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                onContextMenu={(_, e) => e.preventDefault()}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" niceTicks="snap125" />
                <YAxis width="auto" niceTicks="snap125" />
                <Tooltip />
                <Area
                  type="monotone"
                  dot={{
                    fill: "blue",
                  }}
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
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
