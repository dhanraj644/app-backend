import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No results found",
  message = "Try adjusting your search filters or add a new record.",
  icon: Icon = Inbox,
  className = "",
  action
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 md:p-12 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mb-6">
        {message}
      </p>
      {action}
    </div>
  );
}
