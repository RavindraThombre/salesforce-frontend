"use client";

import { ReactNode } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <DashboardTopbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
