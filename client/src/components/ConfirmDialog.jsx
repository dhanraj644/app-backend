import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action? This cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  loading = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-full shrink-0 ${variant === "danger" ? "bg-red-50 dark:bg-red-950/20 text-red-500" : "bg-amber-50 dark:bg-amber-950/20 text-amber-500"}`}>
            <AlertTriangle size={22} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>
        
        <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800/50 pt-4">
          <Button variant="secondary" onClick={onClose} disabled={loading} size="sm">
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading} size="sm">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
