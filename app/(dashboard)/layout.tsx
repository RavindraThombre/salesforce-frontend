"use client";

import { ReactNode } from "react";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardTopbar />

        {/* ONLY DASHBOARD CONTENT SCROLLS */}
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full min-w-0 max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
