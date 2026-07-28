import React from "react";

const Input = React.forwardRef(({
  label,
  error,
  type = "text",
  className = "",
  helperText,
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 outline-none
          ${error 
            ? "border-red-400 bg-red-50/5 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          }
          text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
