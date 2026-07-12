import { CalendarDays } from "lucide-react";

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
    <div className="flex flex-col gap-6 rounded-3xl border bg-card p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-primary font-medium">{greeting}</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Student Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Track your Salesforce learning journey, upcoming live classes,
          certificates and overall progress.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border bg-muted/40 px-5 py-4">
        <CalendarDays className="h-6 w-6 text-primary" />

        <div>
          <p className="text-xs text-muted-foreground">Today</p>

          <p className="font-semibold">{today}</p>
        </div>
      </div>
    </div>
  );
}
