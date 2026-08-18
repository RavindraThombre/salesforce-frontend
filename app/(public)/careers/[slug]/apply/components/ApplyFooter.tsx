"use client";

import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ApplyFooterProps {
  submitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function ApplyFooter({
  submitting,
  onCancel,
  onSubmit,
}: ApplyFooterProps) {
  return (
    <div className="sticky bottom-0 z-10 rounded-xl border bg-background p-4">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>

        <Button onClick={onSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
