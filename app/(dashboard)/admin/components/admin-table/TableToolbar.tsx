"use client";

import { Search, RotateCw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableToolbarProps } from "./types";

export default function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  toolbar,
  onRefresh,
}: TableToolbarProps) {
  return (
    <div className="rounded-3xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 rounded-xl pl-10"
          />
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {toolbar}

          {onRefresh && (
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={onRefresh}
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
