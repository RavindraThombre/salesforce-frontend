"use client";

import { Loader2, RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SettingsActionBarProps {
  saving: boolean;
  onSave: () => void;
  onReset?: () => void;
}

export default function SettingsActionBar({
  saving,
  onSave,
  onReset,
}: SettingsActionBarProps) {
  return (
    <div className="sticky bottom-0 z-20 mt-8 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-end gap-3 p-4">
        {onReset && (
          <Button variant="outline" onClick={onReset} disabled={saving}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}

        <Button onClick={onSave} disabled={saving}>
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
    </div>
  );
}
