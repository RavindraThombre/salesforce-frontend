"use client";

import { CalendarDays, Sparkles } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
        ? "Good Afternoon 👋"
        : "Good Evening 🌙";

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-background" />

      <div className="relative flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            {greeting}
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Monitor students, courses, revenue, trainers and academy performance
            from one centralized dashboard.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 rounded-2xl border bg-background/70 px-5 py-4 backdrop-blur">
          <div className="rounded-xl bg-primary/10 p-3">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">{"Today's Date"}</p>

            <p className="font-semibold">{today}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
