"use client";

import MonthYearPicker from "@/app/components/common/MonthYearPicker";
import { Button } from "@/components/ui/button";
import { CalendarRange, Filter } from "lucide-react";

type Props = {
  onChange: (value: { year: string; month: string }) => void;
  onApply: () => void;
};

export default function DashboardFilters({ onChange, onApply }: Props) {
  return (
    <div className="rounded-3xl border bg-card shadow-sm">
      <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-primary/10 p-3">
            <CalendarRange className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Dashboard Filters</h3>

            <p className="text-sm text-muted-foreground">
              Filter dashboard statistics by month and year.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <MonthYearPicker onChange={onChange} />

          <Button onClick={onApply} className="min-w-[120px] rounded-xl">
            <Filter className="mr-2 h-4 w-4" />
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
