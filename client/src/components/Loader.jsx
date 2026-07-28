import React from "react";

export default function Loader({ size = "md", className = "", fullPage = false }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-t-transparent border-primary-600 ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="loading"
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-sm z-50">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3">
          {spinner}
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading...</span>
        </div>
      </div>
    );
  }

  return spinner;
}
