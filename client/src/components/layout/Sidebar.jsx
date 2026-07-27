import {
  LayoutDashboard,
  Smartphone,
  CheckCircle,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="flex items-center gap-2 p-6 border-b border-slate-700">
        <Menu />
        <h1 className="text-xl font-bold">
          Admin Panel
        </h1>
      </div>

      <nav className="mt-6">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              {menu.name}
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
}