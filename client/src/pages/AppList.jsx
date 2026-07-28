import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApps, deleteApp } from "../api/appApi";
import { toast } from "react-toastify";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import Card from "../components/Card";
import { Plus, Edit, Trash2, Eye, Smartphone } from "lucide-react";

export default function AppList() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Delete Dialog state
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const res = await getApps();
      setApps(res.data.data || []);
    } catch (error) {
      console.error("Fetch apps error:", error);
      toast.error("Failed to fetch applications list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await deleteApp(deleteId);
      toast.success("Application deleted successfully");
      setDeleteId(null);
      fetchApps();
    } catch (error) {
      console.error("Delete app error:", error);
      toast.error(error.response?.data?.message || "Failed to delete application");
    } finally {
      setDeleting(false);
    }
  };

  // Filter apps by query
  const filteredApps = apps.filter(
    (app) =>
      app.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.appCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: "App Name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 rounded-lg">
            <Smartphone size={18} />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {row.appName}
          </span>
        </div>
      ),
    },
    {
      header: "App Code",
      accessor: "appCode",
      cellClassName: "font-mono text-xs text-slate-500 dark:text-slate-400",
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
            ${
              row.isActive !== false
                ? "bg-green-50 text-green-755 dark:bg-green-950/20 dark:text-green-400"
                : "bg-slate-100 text-slate-600 dark:bg-slate-850 dark:text-slate-400"
            }`}
        >
          {row.isActive !== false ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Created Date",
      cell: (row) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/apps/${row._id}`)}
            icon={Eye}
          >
            Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/apps/edit/${row._id}`)}
            icon={Edit}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteId(row._id)}
            icon={Trash2}
            className="text-red-500 hover:text-red-650 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight m-0">
            Applications
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-505 font-semibold mt-1">
            Register and manage your target mobile applications.
          </p>
        </div>
        <Link to="/apps/create">
          <Button variant="primary" icon={Plus} size="sm">
            New Application
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card bodyClassName="flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
          placeholder="Search by name or code..."
        />
        <div className="text-xs font-semibold text-slate-400">
          Showing {filteredApps.length} of {apps.length} applications
        </div>
      </Card>

      {/* Main Apps Table */}
      <Table
        columns={columns}
        data={filteredApps}
        loading={loading}
        onRowClick={(row) => navigate(`/apps/${row._id}`)}
        emptyTitle="No applications found"
        emptyMessage={
          searchQuery
            ? "No apps matched your search criteria. Try a different search query."
            : "Get started by adding your first registered application."
        }
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
        title="Delete Application"
        message="Are you sure you want to delete this application? All associated check-ins will be permanently deleted from the database. This action cannot be undone."
      />
    </div>
  );
}