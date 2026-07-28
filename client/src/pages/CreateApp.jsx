import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { createApp } from "../api/appApi";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import { ArrowLeft, Plus } from "lucide-react";

export default function CreateApp() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await createApp(data);
      toast.success(res.data?.message || "Application created successfully");
      navigate("/apps");
    } catch (error) {
      console.error("Create App error:", error);
      toast.error(error.response?.data?.message || "Failed to create application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/apps" className="text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 m-0">
            Register Application
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-505 font-semibold">
            Add a new application to monitor device check-ins.
          </p>
        </div>
      </div>

      <Card title="Application Details" subtitle="Provide a unique name and tracking code.">
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

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-850">
            <Button variant="secondary" onClick={() => navigate("/apps")} disabled={submitting} size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={submitting} icon={Plus} size="sm">
              Register App
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}