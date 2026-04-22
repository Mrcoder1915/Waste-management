import {
  FaHome,
  FaRecycle,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useUser, useClerk } from "@clerk/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user } = useUser();
  const clerk = useClerk();

  const handleLogout = () => {
    clerk.signOut();
  };

  const nav = [
    { name: "Overview", icon: <FaHome />, path: "/" },
    { name: "Segregation", icon: <FaRecycle />, path: "/segregation" },
    { name: "Reports", icon: <FaChartLine />, path: "/reports" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="w-0 invisible lg:visible lg:w-full flex-1 bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col justify-between p-6">
      <div>
        <h2 className="text-xl font-bold mb-6">WASTE SYSTEM</h2>

        <ul className="space-y-3">
          {nav.map((item, index) => (
            <Link to={item.path}>
              <li
                key={index}
                className="p-3 hover:bg-green-700 rounded flex items-center gap-2"
              >
                {" "}
                {item.icon} {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2">
          {user?.firstName} {user?.lastName}
        </p>
        <button
          className="flex items-center gap-2 text-sm"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
