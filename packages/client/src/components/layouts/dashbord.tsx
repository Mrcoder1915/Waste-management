import { useState, ReactNode } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { FaHome, FaRecycle, FaChartLine, FaCog, FaUser } from "react-icons/fa";

const navItems = [
  { name: "Overview", icon: <FaHome />, path: "/" },
  { name: "Segregation", icon: <FaRecycle />, path: "/segregation" },
  { name: "Reports", icon: <FaChartLine />, path: "/reports" },
  { name: "User Management", icon: <FaUser />, path: "/user-management" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* SIDEBAR Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={navItems}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* MOBILE TOP BAR (Only visible on small screens) */}
        <header className="lg:hidden bg-green-900 text-white p-4 flex items-center justify-between shadow-md">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl p-1"
          >
            <FaBars />
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
