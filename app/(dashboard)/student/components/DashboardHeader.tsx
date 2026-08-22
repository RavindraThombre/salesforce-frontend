"use client";

import { CalendarDays } from "lucide-react";

import { useUser } from "@/app/context/UserContext";

export default function DashboardHeader() {
  const { user } = useUser();

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

  const firstName = user?.name || "Student";

  return (
    <div
      className="
        flex
        w-full
        min-w-0
        flex-col
        gap-4
        overflow-hidden
        rounded-2xl
        border
        bg-card
        p-4
        shadow-sm
        min-[390px]:p-5
        sm:gap-5
        sm:p-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-primary sm:text-base">
          {greeting}
        </p>

        <h1 className="mt-1.5 truncate text-lg font-bold tracking-tight min-[390px]:text-xl sm:mt-2 sm:text-2xl">
          {firstName} Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Track your Salesforce learning journey, upcoming live classes,
          certificates and overall progress.
        </p>
      </div>

      {/* DATE */}
      <div
        className="
          flex
          w-full
          min-w-0
          items-center
          gap-3
          rounded-xl
          border
          bg-muted/40
          px-4
          py-3
          min-[390px]:px-5
          min-[390px]:py-4
          sm:w-auto
          sm:min-w-[260px]
        "
      >
        <div className="shrink-0 rounded-lg bg-primary/10 p-2 sm:p-3">
          <CalendarDays className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Today</p>

          <p className="truncate text-sm font-semibold sm:text-base">{today}</p>
        </div>
      </div>
    </div>
  );
}
