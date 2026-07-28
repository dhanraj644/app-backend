import React from "react";

export default function Card({
  children,
  title,
  subtitle,
  actions,
  className = "",
  bodyClassName = "",
  ...props
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-2xl shadow-xs transition-all duration-200 hover:shadow-md hover:shadow-slate-200/40 dark:hover:shadow-none ${className}`}
      {...props}
    >
      {(title || subtitle || actions) && (
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between gap-4 flex-wrap">
          <div>
            {title && (
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg leading-6">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
