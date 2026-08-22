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
    <div className="relative w-full min-w-0 overflow-hidden rounded-2xl border bg-card shadow-sm sm:rounded-3xl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-background" />

      <div
        className="
          relative
          flex
          w-full
          min-w-0
          flex-col
          gap-5
          p-4

          min-[390px]:p-5
          sm:p-6
          md:p-8
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div
            className="
              mb-3
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              bg-primary/10
              px-3
              py-1
              text-xs
              font-medium
              text-primary
              sm:text-sm
            "
          >
            <Sparkles className="h-4 w-4 shrink-0" />

            <span className="truncate">{greeting}</span>
          </div>

          <h1 className="mt-1.5 truncate text-lg font-bold tracking-tight min-[390px]:text-xl sm:mt-2 sm:text-2xl">
            Admin Dashboard
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-muted-foreground

              min-[390px]:text-base
            "
          >
            Monitor students, courses, revenue, trainers and academy performance
            from one centralized dashboard.
          </p>
        </div>

        {/* Right - Date */}
        <div
          className="
            flex
            w-full
            min-w-0
            items-center
            gap-3
            overflow-hidden
            rounded-xl
            border
            bg-background/70
            px-3
            py-3
            backdrop-blur

            min-[390px]:rounded-2xl
            min-[390px]:px-4
            sm:w-auto
            sm:min-w-[280px]
            sm:px-5
            sm:py-4
          "
        >
          <div
            className="
              shrink-0
              rounded-xl
              bg-primary/10
              p-2.5

              sm:p-3
            "
          >
            <CalendarDays className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Today&apos;s Date</p>

            <p
              className="
                mt-1
                truncate
                text-sm
                font-semibold

                min-[390px]:text-base
                sm:whitespace-nowrap
              "
            >
              {today}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
