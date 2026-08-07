import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DashboardLayout from "../components/layouts/dashbord";
import Topbar from "../components/Topbar";
import { Button } from "../components/catalyst/button";
import { Subheading } from "../components/catalyst/heading";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export default function BeautifulReports() {
  // const [activeTab, setActiveTab] = useState('Overview');

  // Chart Data
  const doughnutData = {
    labels: ["Bio", "Non-Bio", "Residual"],
    datasets: [
      {
        data: [5432, 2100, 1228],
        backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="flex w-full bg-[#F8FAFC] font-sans text-slate-900">
        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header Section */}

          <Topbar
            title="Reports"
            subtitle="Detailed insights into waste segregation and processing."
          />
          <div className="gap-2 flex justify-end mb-5">
            <Button variant="outline">Export</Button>
            <Button variant="primary">Live View</Button>
          </div>

          {/* 2. STATS GRID WITH GRADIENT ACCENTS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              {
                label: "Grand Total",
                val: "8,760",
                sub: "12% ↑ vs last week",
                color: "border-blue-500",
              },
              {
                label: "Biodegradable",
                val: "5,432",
                sub: "Healthy Volume",
                color: "border-emerald-500",
              },
              {
                label: "Non-Biodegradable",
                val: "2,100",
                sub: "Increased +5%",
                color: "border-blue-400",
              },
              {
                label: "Residual",
                val: "1,228",
                sub: "Needs Attention",
                color: "border-amber-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white p-6 rounded-2xl border-b-4 ${item.color} shadow-sm hover:-translate-y-1 transition-transform duration-300`}
              >
                <p className="text-[11px] font-black text-slate-400 uppercase mb-2">
                  {item.label}
                </p>
                <p className="text-3xl font-black text-slate-800">
                  {item.val}{" "}
                  <span className="text-sm font-normal text-slate-400">kg</span>
                </p>
                <p className="text-[10px] font-bold text-emerald-600 mt-2 bg-emerald-50 inline-block px-2 py-0.5 rounded-full">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

          {/* 3. DUAL-CHART SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <Subheading>Volume Over Time</Subheading>
                <select className="bg-slate-50 border-none rounded-lg text-xs font-bold px-3 py-1 text-slate-500">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        label: "Weight (kg)",
                        data: [1200, 1900, 1500, 2100, 2400, 1100, 800],
                        backgroundColor: "#10b981",
                        borderRadius: 8,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
              <h3 className="font-black text-lg text-slate-800 uppercase tracking-tighter mb-6 w-full text-left">
                Waste Mix
              </h3>
              <div className="h-48 w-48 mb-6">
                <Doughnut data={doughnutData} options={{ cutout: "75%" }} />
              </div>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>{" "}
                    Bio
                  </span>
                  <span>62%</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>{" "}
                    Non-Bio
                  </span>
                  <span>24%</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>{" "}
                    Residual
                  </span>
                  <span>14%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. REFINED DATA TABLE */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-tighter">
                Live Segregation Log
              </h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Live Feed
                </span>
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50">
                  <th className="px-6 py-4">Item ID</th>
                  <th className="px-6 py-4">Detection</th>
                  <th className="px-6 py-4">Accuracy</th>
                  <th className="px-6 py-4">Target Bin</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-semibold">
                {[
                  {
                    id: "#5880",
                    type: "Organic Food",
                    conf: "99%",
                    bin: "Bio",
                    status: "Processed",
                    color: "text-emerald-600 bg-emerald-50",
                  },
                  {
                    id: "#5882",
                    type: "Plastic PET",
                    conf: "85%",
                    bin: "Non-Bio",
                    status: "Flagged",
                    color: "text-amber-600 bg-amber-50",
                  },
                  {
                    id: "#5803",
                    type: "Glass Bottle",
                    conf: "92%",
                    bin: "Non-Bio",
                    status: "Processed",
                    color: "text-emerald-600 bg-emerald-50",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <td className="px-6 py-4 font-bold text-slate-400 text-xs">
                      {row.id}
                    </td>
                    <td className="px-6 py-4 text-slate-800">{row.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: row.conf }}
                          ></div>
                        </div>
                        <span className="text-[10px]">{row.conf}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold">{row.bin}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${row.color}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}
