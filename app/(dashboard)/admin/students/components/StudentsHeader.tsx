"use client";

import { GraduationCap, CalendarDays } from "lucide-react";

export default function StudentsHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10" />

      <div className="relative flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Students</h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage registered students, monitor enrollments, and access
              student profiles from a single place.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 rounded-2xl border bg-background/80 px-5 py-4 backdrop-blur">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
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
