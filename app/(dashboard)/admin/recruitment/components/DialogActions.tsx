"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface DialogActionsProps {
  saving: boolean;
  isEdit: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function DialogActions({
  saving,
  isEdit,
  onCancel,
  onSave,
}: DialogActionsProps) {
  return (
    <DialogFooter className="border-t pt-6 m-2">
      <Button variant="outline" onClick={onCancel} disabled={saving}>
        Cancel
      </Button>

      <Button onClick={onSave} disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

        {saving ? "Saving..." : isEdit ? "Update Position" : "Create Position"}
      </Button>
    </DialogFooter>
  );
}
