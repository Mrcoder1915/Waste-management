import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import { signOut, useSession } from "../lib/auth-client";
import { Link } from "react-router-dom";
import { JSX } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  navItems: { name: string; icon: JSX.Element; path: string }[];
}

export default function Sidebar({ isOpen, onClose, navItems }: SidebarProps) {
  const { data: session, isPending } = useSession();

  return (
    <>
      {/* 1. MOBILE OVERLAY (Darkens the background when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* 2. SIDEBAR PANEL */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-900 to-green-800 text-white 
          transform transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">WASTE SYSTEM</h2>
            {/* Close button - Only visible on mobile */}
            <button onClick={onClose} className="lg:hidden text-2xl">
              <FaTimes />
            </button>
          </div>

          <ul className="space-y-3">
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.path} // Key goes on the Link
                onClick={onClose} // Close sidebar when a link is clicked
              >
                <li className="p-3 hover:bg-green-700 rounded flex items-center gap-3 transition-colors">
                  {item.icon} {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="border-t border-green-700 pt-6">
          <p className="mb-2 font-medium">{session?.user?.name}</p>
          <button
            className="flex items-center gap-2 text-sm hover:text-red-300 transition-colors"
            onClick={() => signOut()}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
