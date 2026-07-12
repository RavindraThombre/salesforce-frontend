"use client";

import { Database } from "lucide-react";
import { TableEmptyProps } from "./types";

export default function TableEmpty({
  message = "No records found.",
}: TableEmptyProps) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed bg-card px-6 text-center">
      <div className="mb-5 rounded-full bg-primary/10 p-5">
        <Database className="h-10 w-10 text-primary" />
      </div>

      <h3 className="text-xl font-semibold">Nothing to display</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
