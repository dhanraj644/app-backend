import React from "react";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

export default function Table({
  columns,
  data = [],
  loading = false,
  emptyMessage,
  emptyTitle,
  onRowClick,
  className = "",
  ...props
}) {
  return (
    <div className={`w-full overflow-hidden border border-slate-100 dark:border-slate-800/60 rounded-2xl bg-white dark:bg-slate-900 ${className}`} {...props}>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/40 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/50">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-4 font-semibold ${col.className || ""}`}
                  style={col.style}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader size="md" />
                    <span className="text-slate-400 dark:text-slate-500 font-medium">Fetching records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <EmptyState title={emptyTitle} message={emptyMessage} />
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors duration-150 ${onRowClick ? "cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/25" : ""}`}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-6 py-4.5 font-medium text-slate-700 dark:text-slate-300 ${col.cellClassName || ""}`}
                    >
                      {col.cell ? col.cell(row, rowIdx) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
