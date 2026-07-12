"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableLoadingProps } from "./types";

export default function TableLoading({
  columns = 6,
  rows = 8,
}: TableLoadingProps) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Header */}
      <div className="border-b bg-muted/30 px-6 py-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-24 rounded-md" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="grid gap-4 px-6 py-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, col) => (
              <Skeleton key={col} className="h-5 w-full rounded-md" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
