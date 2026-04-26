import React from "react";
import DashboardLayout from '../components/layouts/dashbord';

export default function SegregationPage() {
  const logs = [
    "Detected: Paper Box",
    "Detected: Plastic Bottle",
    "Arm moving... Success",
    "Detected: Metal Can",
    "Sorting complete",
  ];

  return (
    <DashboardLayout>
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Segregation Monitor</h1>

      {/* STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">System</h2>
          <p className="text-green-600 font-bold text-lg">Running</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Controller</h2>
          <p className="font-bold text-lg">ESP32 Connected</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Gripper</h2>
          <p className="text-yellow-500 font-bold text-lg">Idle</p>
        </div>
      </div>

      {/* LOGS */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold">Activity Log</h2>
          <button className="text-sm text-red-500">Clear</button>
        </div>

        <div className="h-48 overflow-y-auto border rounded-lg p-2">
          {logs.map((log, index) => (
            <div
              key={index}
              className="text-sm border-b py-1 text-gray-700"
            >
              [{new Date().toLocaleTimeString()}] {log}
            </div>
          ))}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="font-semibold mb-3">Manual Controls</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button className="btn">Return Home</button>
          <button className="btn">Toggle Gripper</button>
          <button className="btn">Skip Item</button>
          <button className="btn">Send to Bin A</button>
          <button className="btn">Send to Bin B</button>
          <button className="btn-danger">STOP</button>
        </div>
      </div>

      {/* COORDINATES */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Coordinates</h2>
        <p className="text-gray-700">X: 140 | Y: 310 | Z: 120</p>
      </div>
    </div>
    </DashboardLayout>
  );
}