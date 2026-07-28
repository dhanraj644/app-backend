import React, { useEffect, useState, useCallback } from "react";
import { getCheckIns, deleteCheckIn } from "../api/checkIn.api";
import { getApps } from "../api/appApi";
import { toast } from "react-toastify";
import Card from "../components/Card";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import { RefreshCw, FilterX, Trash2 } from "lucide-react";

export default function CheckIns() {
  const [checkIns, setCheckIns] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [deviceId, setDeviceId] = useState("");
  const [appId, setAppId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchApps = async () => {
    try {
      const res = await getApps();
      setApps(res.data.data || []);
    } catch (error) {
      console.error("Checkins fetch apps error:", error);
    }
  };

  const fetchCheckInsList = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (deviceId.trim()) params.deviceId = deviceId.trim();
      if (appId) params.appId = appId;
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;

      const res = await getCheckIns(params);
      console.log(res.data.data );
      setCheckIns(res.data.data || []);
    } catch (error) {
      console.error("Checkins list load error:", error);
      toast.error("Failed to load check-ins list");
    } finally {
      setLoading(false);
    }
  }, [deviceId, appId, fromDate, toDate]);

  useEffect(() => {
    fetchApps();
  }, []);

  useEffect(() => {
    fetchCheckInsList();
  }, [fetchCheckInsList]);

  const clearFilters = () => {
    setDeviceId("");
    setAppId("");
    setFromDate("");
    setToDate("");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await deleteCheckIn(deleteId);
      toast.success("Check-in record deleted successfully");
      setDeleteId(null);
      fetchCheckInsList();
    } catch (error) {
      console.error("Delete check-in error:", error);
      toast.error("Failed to delete check-in record");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      header: "App Name",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {row.app?.appName || "Unknown App"}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-505 font-mono">
            {row.app?.appCode || "N/A"}
          </span>
        </div>
      ),
    },
    {
      header: "Device ID",
      accessor: "deviceId",
      cellClassName: "font-mono text-xs text-slate-500 dark:text-slate-400",
    },
    {
      header: "Platform",
      cell: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
            ${
              row.platform === "Android"
                ? "bg-green-55/90 text-green-750 dark:bg-green-950/20 dark:text-green-400"
                : "bg-blue-55/90 text-blue-755 dark:bg-blue-950/20 dark:text-blue-400"
            }`}
        >
          {row.platform}
        </span>
      ),
    },
    {
      header: "Device Model",
      cell: (row) => (
        <div className="text-slate-700 dark:text-slate-350 text-xs">
          <p className="font-semibold">{row.deviceName || "Generic Device"}</p>
          <p className="text-slate-400 dark:text-slate-500">OS: {row.osVersion || "Unknown"}</p>
        </div>
      ),
    },
    {
      header: "Tester Name",
      accessor: "testerName",
      cellClassName: "text-slate-650 dark:text-slate-450",
    },
    {
      header: "Check-in Time",
      cell: (row) => {
        if (!row.checkedAt) return row.checkInDate;
        const d = new Date(row.checkedAt);
        return (
          <div className="text-slate-650 dark:text-slate-450 text-xs font-medium">
            <p className="font-semibold">{d.toLocaleDateString()}</p>
            <p className="text-slate-400 dark:text-slate-500">
              {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        );
      },
    },
    {
      header: "Actions",
      cell: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDeleteId(row._id)}
          icon={Trash2}
          className="text-red-500 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight m-0">
            Device Check-Ins
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-505 font-semibold mt-1">
            Global log of all mobile test devices check-ins.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchCheckInsList} icon={RefreshCw}>
          Sync Log
        </Button>
      </div>

      {/* Filters Card */}
      <Card title="Query Filters" subtitle="Search and filter device logs.">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Search Device ID
            </label>
            <SearchBar
              value={deviceId}
              onChange={setDeviceId}
              onClear={() => setDeviceId("")}
              placeholder="Filter by device ID..."
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Filter by Application
            </label>
            <select
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="">All Applications</option>
              {apps.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.appName} ({a.appCode})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-105 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-105 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
        {(deviceId || appId || fromDate || toDate) && (
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters} icon={FilterX} className="text-xs font-semibold text-red-500 hover:text-red-655 hover:bg-red-50/50">
              Clear Filters
            </Button>
          </div>
        )}
      </Card>

      {/* Main Check-Ins Table */}
      <Table
        columns={columns}
        data={checkIns}
        loading={loading}
        emptyTitle="No check-in logs found"
        emptyMessage="No devices have checked in matching the selected filter criteria."
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
        title="Delete Check-in Record"
        message="Are you sure you want to delete this check-in record? This will remove the device entry from today's logs. This action cannot be undone."
      />
    </div>
  );
}
