import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAppById, updateApp } from "../api/appApi";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { ArrowLeft, Save } from "lucide-react";

export default function EditApp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchApp = async () => {
      try {
        setLoading(true);
        const res = await getAppById(id);
        const app = res.data.data;
        if (app) {
          setValue("appName", app.appName);
          setValue("appCode", app.appCode);
          setValue("isActive", app.isActive !== false);
        }
      } catch (error) {
        console.error("Fetch app by ID error:", error);
        toast.error("Failed to load application details");
        navigate("/apps");
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await updateApp(id, data);
      toast.success(res.data?.message || "Application updated successfully");
      navigate("/apps");
    } catch (error) {
      console.error("Update App error:", error);
      toast.error(error.response?.data?.message || "Failed to update application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/apps" className="text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 m-0">
            Edit Application
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-505 font-semibold">
            Modify configuration details and status settings.
          </p>
        </div>
      </div>

      <Card title="Update Details" subtitle="Edit name, code or active status.">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Application Name"
            placeholder="e.g. WearIt Shopping Client"
            error={errors.appName?.message}
            {...register("appName", {
              required: "Application Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })}
          />

          <Input
            label="Application Code"
            placeholder="e.g. wearit-shop-app"
            error={errors.appCode?.message}
            helperText="A unique identifier used by mobile SDKs for check-ins."
            {...register("appCode", {
              required: "Application Code is required",
              pattern: {
                value: /^[a-z0-9-_]+$/,
                message: "Only lowercase letters, numbers, hyphens, and underscores allowed"
              }
            })}
          />

          {/* Status field */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="w-4 h-4 text-primary-600 border-slate-350 rounded focus:ring-primary-500"
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 dark:text-slate-300 select-none">
              Application is active (accept check-ins)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-850">
            <Button variant="secondary" onClick={() => navigate("/apps")} disabled={submitting} size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={submitting} icon={Save} size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
