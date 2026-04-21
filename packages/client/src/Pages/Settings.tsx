import { useState, FC } from "react";
import DashboardLayout from "../components/layouts/dashbord";

const Settings: FC = () => {

  // ✅ State
  const [settings, setSettings] = useState({
    systemName: "Waste System",
    adminName: "Admin",
    email: "admin@email.com",
    darkMode: false,
    notifications: true,
  });

  // ✅ Handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Save (for now console only)
  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("Settings Saved!");
  };

  return (
    <DashboardLayout>
    <div className="p-6 bg-gray-100 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded shadow max-w-xl">

        {/* SYSTEM NAME */}
        <div className="mb-4">
          <label className="block text-sm mb-1">System Name</label>
          <input
            type="text"
            name="systemName"
            value={settings.systemName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* ADMIN NAME */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Admin Name</label>
          <input
            type="text"
            name="adminName"
            value={settings.adminName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* TOGGLES */}
        <div className="flex items-center justify-between mb-4">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <span>Notifications</span>
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Save Settings
        </button>

      </div>
    </div>
    </DashboardLayout>
  );
};

export default Settings;