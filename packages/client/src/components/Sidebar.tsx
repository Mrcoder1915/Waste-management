import { FaHome, FaRecycle, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useUser, useClerk } from "@clerk/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const {user} = useUser();
  const clerk = useClerk();


  const handleLogout = () => {
    clerk.signOut();
  };

  return (
    <div className="w-full flex-1 bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col justify-between p-6">
      
      <div>
        <h2 className="text-xl font-bold mb-6">WASTE SYSTEM</h2>

        <ul className="space-y-3">
          <li className="bg-green-600 p-3 rounded-lg flex items-center gap-2">
            <Link to="/">
            <FaHome /> Overview
            </Link>
          </li>
          <li className="p-3 hover:bg-green-700 rounded flex items-center gap-2">
            
            <Link to ="/segregation"> <FaRecycle /> Segregation   </Link>
          </li>
          <li className="p-3 hover:bg-green-700 rounded flex items-center gap-2">
            <Link to ="/reports"> <FaChartLine /> Reports </Link>
          </li>
          <li className="p-3 hover:bg-green-700 rounded flex items-center gap-2">
             <Link to ="/settings"> <FaCog /> Settings </Link>
          </li>
        </ul>
      </div>

      <div>
        <p className="mb-2">{user?.firstName} {user?.lastName}</p>
        <button className="flex items-center gap-2 text-sm" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}