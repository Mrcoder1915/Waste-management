import { FaBell } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Waste Segregation Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Welcome back, Admin! Here's your waste overview.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white px-3 py-2 rounded shadow text-sm">
          April 5, 2024
        </div>
        <FaBell className="text-gray-500" />
      </div>
    </div>
  );
}