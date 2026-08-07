import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../lib/auth-client";
import { NavLink } from "react-router-dom";
import { JSX } from "react";
import { Recycle } from "lucide-react";
import { cx } from "../lib/cx";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  navItems: { name: string; icon: JSX.Element; path: string }[];
}

export default function Sidebar({ isOpen, onClose, navItems }: SidebarProps) {
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
          fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#07160F] to-[#0C2A1C] text-white 
          transform transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Recycle className="size-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Waste Management
                </p>
                <p className="text-[11px] text-white/40 leading-tight">
                  Robotics Arm Segregation
                </p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-2xl">
              <FaTimes />
            </button>
          </div>

          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cx(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-emerald-500/15 text-white"
                        : "text-white/70 hover:bg-white/5",
                    )
                  }
                >
                  {item.icon} {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-green-700 pt-6">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 border border-red-500/30 bg-red-500/10 hover:bg-red-500 hover:text-white hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-colors"
          >
            <FaSignOutAlt className="text-base" /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
