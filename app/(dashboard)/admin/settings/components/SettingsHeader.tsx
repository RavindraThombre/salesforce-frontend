"use client";

import { Loader2, Save, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SettingsHeaderProps {
  saving: boolean;
  onSave: () => void;
}

export default function SettingsHeader({
  saving,
  onSave,
}: SettingsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
          <Settings2 className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Platform Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage platform configuration, payment gateways, and third-party
            integrations.
          </p>
        </div>
      </div>

      <Button onClick={onSave} disabled={saving} className="min-w-40">
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    </div>
  );
}
