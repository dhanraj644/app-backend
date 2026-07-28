import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Bell, Menu, ChevronRight } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate breadcrumb items
  const breadcrumbs = [
    { name: "Dashboard", path: "/" },
    ...pathnames.map((value, index) => {
      const path = `/${pathnames.slice(0, index + 1).join("/")}`;
      let name = value.charAt(0).toUpperCase() + value.slice(1);
      if (value.match(/^[0-9a-fA-F]{24}$/)) { // If it's a MongoDB ObjectId
        name = "Details";
      } else if (name === "Apps") {
        name = "Apps";
      } else if (name === "Create") {
        name = "New App";
      } else if (name === "Edit") {
        name = "Edit App";
      }
      return { name, path };
    }),
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/50 sticky top-0 z-20">
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        {/* Left Side: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-sm font-semibold">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <div key={crumb.path} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight size={14} className="text-slate-400" />}
                  {isLast ? (
                    <span className="text-slate-800 dark:text-slate-100 font-bold">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-350 transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Quick Action & Profile */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-600 rounded-full" />
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-850" />

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">Admin User</p>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">System Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}