import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApps } from "../api/appApi";
import { getCheckIns } from "../api/checkIn.api";
import Card from "../components/Card";
import Table from "../components/Table";
import Button from "../components/Button";
import { Smartphone, CheckCircle, Calendar, Plus, ChevronRight, Activity } from "lucide-react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApps: 0,
    totalCheckIns: 0,
    todayCheckIns: 0,
  });
  const [recentCheckIns, setRecentCheckIns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appsRes, checkInsRes] = await Promise.all([
          getApps(),
          getCheckIns(),
        ]);

        const apps = appsRes.data.data || [];
        const checkIns = checkInsRes.data.data || [];

        // Calculate today's check-ins in IST (matching backend checkInDate format)
        const todayIST = new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        });
        const todayCount = checkIns.filter((c) => c.checkInDate === todayIST).length;

        setStats({
          totalApps: apps.length,
          totalCheckIns: checkIns.length,
          todayCheckIns: todayCount,
        });

        // Get 5 most recent check-ins
        setRecentCheckIns(checkIns.slice(0, 5));
      } catch (error) {
        console.error("Dashboard data load error:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      header: "App Name",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {row.app?.appName || "Unknown App"}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
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
                ? "bg-green-55/90 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                : "bg-blue-55/90 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
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
      cellClassName: "text-slate-600 dark:text-slate-450",
    },
    {
      header: "Checked In At",
      cell: (row) => {
        if (!row.checkedAt) return row.checkInDate;
        const d = new Date(row.checkedAt);
        return (
          <div className="text-slate-650 dark:text-slate-450 text-xs">
            <p className="font-semibold">{d.toLocaleDateString()}</p>
            <p className="text-slate-400 dark:text-slate-500">
              {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight m-0">
            Dashboard
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-semibold mt-1">
            Real-time analytics and application check-ins.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/apps/create">
            <Button variant="primary" icon={Plus} size="sm">
              Register App
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Total Apps
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                {loading ? "..." : stats.totalApps}
              </h3>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
              <Smartphone size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-semibold text-indigo-650 dark:text-indigo-400">
            <Link to="/apps" className="hover:underline flex items-center gap-1">
              Manage Applications <ChevronRight size={14} />
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Total Check-ins
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                {loading ? "..." : stats.totalCheckIns}
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-semibold text-emerald-650 dark:text-emerald-400">
            <Link to="/check-ins" className="hover:underline flex items-center gap-1">
              View all history <ChevronRight size={14} />
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Today's Check-ins
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                {loading ? "..." : stats.todayCheckIns}
              </h3>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-650 dark:text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-semibold text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Activity size={14} className="text-amber-55" />
              Reset daily (IST timezone)
            </span>
          </div>
        </Card>
      </div>

      {/* Recent Check-ins Section */}
      <Card 
        title="Recent Check-ins" 
        subtitle="The latest app check-ins received from mobile test devices."
        actions={
          <Link to="/check-ins">
            <Button variant="ghost" size="sm" className="gap-1 font-semibold text-xs text-primary-600 hover:text-primary-700">
              View All <ChevronRight size={14} />
            </Button>
          </Link>
        }
      >
        <Table
          columns={columns}
          data={recentCheckIns}
          loading={loading}
          emptyTitle="No check-ins today"
          emptyMessage="New mobile check-ins will appear here in real time."
        />
      </Card>
    </div>
  );
}
