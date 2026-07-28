import React from "react";
import Loader from "./Loader";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  icon: Icon,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/10 focus:ring-primary-500",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 focus:ring-slate-400",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/10 focus:ring-red-400",
    success: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/10 focus:ring-emerald-400",
    outline: "border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-primary-500",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-primary-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4.5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader size="sm" className="text-current border-2" />}
      {!loading && Icon && <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} className="shrink-0" />}
      {children}
    </button>
  );
}
