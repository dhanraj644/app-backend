import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Smartphone, CheckCircle, X, ShieldCheck } from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Apps",
    path: "/apps",
    icon: Smartphone,
  },
  {
    name: "Check-Ins",
    path: "/check-ins",
    icon: CheckCircle,
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside
      className={`fixed lg:static top-0 bottom-0 left-0 w-64 bg-slate-950 border-r border-slate-900 text-white z-40 transition-transform duration-300 lg:translate-x-0 flex flex-col h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-900">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-primary-600 rounded-lg text-white">
            <ShieldCheck size={22} className="shrink-0" />
          </div>
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            App Dashboard
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150
                  ${isActive
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                    : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                  }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {menu.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-900 text-xs text-slate-500 font-medium">
        <span>© 2026 Admin Portal v1.0.0</span>
      </div>
    </aside>
  );
}