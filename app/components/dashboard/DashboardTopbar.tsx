"use client";

import { Bell, User } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default function DashboardTopbar() {
  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Bell className="cursor-pointer" />
        <User className="cursor-pointer" />
      </div>
    </header>
  );
}
