
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", bio: 120, rec: 80, res: 50 },
  { month: "Feb", bio: 150, rec: 90, res: 60 },
  { month: "Mar", bio: 170, rec: 100, res: 70 },
  { month: "Apr", bio: 140, rec: 85, res: 55 },
  { month: "May", bio: 160, rec: 95, res: 65 },
];

export default function Chart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="mb-4 font-semibold">Monthly Waste (kg)</h2>
      <div style={{width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bio" fill="#16a34a" />
          <Bar dataKey="rec" fill="#3b82f6" />
          <Bar dataKey="res" fill="#eab308" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
}