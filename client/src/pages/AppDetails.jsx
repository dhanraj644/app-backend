import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAppById } from "../api/appApi";
import { getCheckInsByApp } from "../api/checkIn.api";
import { toast } from "react-toastify";
import Card from "../components/Card";
import Table from "../components/Table";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { ArrowLeft, Smartphone, RefreshCw, FilterX } from "lucide-react";

export default function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [app, setApp] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [loadingApp, setLoadingApp] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);



  // Filters State
  const [deviceId, setDeviceId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchAppDetails = useCallback(async () => {
    try {
      setLoadingApp(true);
      const res = await getAppById(id);
      setApp(res.data.data);
    } catch (error) {
      console.error("AppDetails fetch app error:", error);
      toast.error("Failed to load application details");
      navigate("/apps");
    } finally {
      setLoadingApp(false);
    }
  }, [id, navigate]);

  const fetchCheckInHistory = useCallback(async () => {
    try {
      setLoadingHistory(true);
      // Build query filters
      const params = {};
      if (deviceId.trim()) params.deviceId = deviceId.trim();
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;

      const res = await getCheckInsByApp(id, params);
      setCheckIns(res.data.data || []);
    } catch (error) {
      console.error("AppDetails fetch checkins error:", error);
      toast.error("Failed to load check-in history");
    } finally {
      setLoadingHistory(false);
    }
  }, [id, deviceId, fromDate, toDate]);

  useEffect(() => {
    fetchAppDetails();
  }, [fetchAppDetails]);

  useEffect(() => {
    fetchCheckInHistory();
  }, [fetchCheckInHistory]);

  const clearFilters = () => {
    setDeviceId("");
    setFromDate("");
    setToDate("");
  };

  const columns = [
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
                ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                : "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
            }`}
        >
          {row.platform}
        </span>
      ),
    },
    {
      header: "Device Name",
      accessor: "deviceName",
      cellClassName: "font-semibold text-slate-700 dark:text-slate-300",
    },
    {
      header: "OS Version",
      accessor: "osVersion",
      cellClassName: "text-slate-600 dark:text-slate-400 text-xs",
    },
    {
      header: "Tester Name",
      accessor: "testerName",
      cellClassName: "text-slate-650 dark:text-slate-450",
    },
    {
      header: "Check-in Date",
      cell: (row) => {
        if (!row.checkedAt) return row.checkInDate;
        return new Date(row.checkedAt).toLocaleDateString();
      },
    },
    {
      header: "Check-in Time",
      cell: (row) => {
        if (!row.createdAt) return "N/A";
        return new Date(row.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
  ];

  if (loadingApp) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/apps" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 m-0">
              {app?.appName}
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold font-mono">
              Code: {app?.appCode}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
              ${
                app?.isActive !== false
                  ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-400"
              }`}
          >
            {app?.isActive !== false ? "Active" : "Inactive"}
          </span>
          <Button variant="outline" size="sm" onClick={fetchCheckInHistory} icon={RefreshCw}>
            Sync History
          </Button>
        </div>
      </div>

      {/* Main Info Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-455 uppercase tracking-wider">Application Info</span>
            <div className="mt-4 space-y-3.5">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Created At</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-305 font-mono">
                  {app?.createdAt ? new Date(app.createdAt).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Last Updated</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-305 font-mono">
                  {app?.updatedAt ? new Date(app.updatedAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Total Check-ins
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                {loadingHistory ? "..." : checkIns.length}
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-550 font-semibold mt-1">
                Unique test check-ins received for this application.
              </p>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 rounded-xl">
              <Smartphone size={28} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtering Panel */}
      <Card title="Check-in History Filters" subtitle="Narrow down your check-in list.">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
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
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
        {(deviceId || fromDate || toDate) && (
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters} icon={FilterX} className="text-xs font-semibold text-red-500 hover:text-red-650 hover:bg-red-50/50">
              Clear Filters
            </Button>
          </div>
        )}
      </Card>

      {/* History Table */}
      <Card title="Check-in History" subtitle="List of check-in events.">
        <Table
          columns={columns}
          data={checkIns}
          loading={loadingHistory}
          emptyTitle="No check-ins found"
          emptyMessage="No devices have checked in matching the current filters."
        />
      </Card>
    </div>
  );
}
