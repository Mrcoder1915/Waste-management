import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {

  const data = {
    labels: ["Jan","Feb","Mar","Apr","May"],
    datasets: [
      {
        label: "Biodegradable",
        data: [120,150,170,140,160],
        backgroundColor: "#16a34a",
      },
      {
        label: "Recyclable",
        data: [80,90,100,85,95],
        backgroundColor: "#2563eb",
      },
      {
        label: "Residual",
        data: [50,60,70,55,65],
        backgroundColor: "#f59e0b",
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-100 min-h-100%">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* CHART */}
      <div className="bg-white p-4 rounded shadow h-[50%]">
        <Bar data={data} />
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <h2>Total Biodegradable</h2>
          <p className="text-xl font-bold">580 kg</p>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          <h2>Total Recyclable</h2>
          <p className="text-xl font-bold">355 kg</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2>Total Residual</h2>
          <p className="text-xl font-bold">235 kg</p>
        </div>
      </div>
    </div>
  );
}