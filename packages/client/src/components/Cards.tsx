import { FaLeaf, FaRecycle, FaTrash, FaChartPie } from "react-icons/fa";

export default function Cards() {
  const data = [
    { title: "Biodegradable", value: 580, icon: <FaLeaf />, color: "text-green-500" },
    { title: "Recyclable", value: 355, icon: <FaRecycle />, color: "text-blue-500" },
    { title: "Residual", value: 235, icon: <FaTrash />, color: "text-yellow-500" },
    { title: "Total Waste", value: 1170, icon: <FaChartPie />, color: "text-purple-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {data.map((item, i) => (
        <div key={`${item.title} ${i}`} className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border">
          <div className={`text-2xl ${item.color}`}>{item.icon}</div>
          <div>
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-xl font-bold">{item.value} kg</h2>
          </div>
        </div>
      ))}
    </div>
  );
}