"use client";

import Link from "next/link";
import { Home, BookOpen, Users, CreditCard, Settings } from "lucide-react";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-background border-r hidden md:flex flex-col">
      <div className="p-4 text-xl font-bold text-primary">
        SalesforceAcademy
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link href="/admin" className="sidebar-link">
          <Home size={18} /> Dashboard
        </Link>

        <Link href="/admin/courses" className="sidebar-link">
          <BookOpen size={18} /> Courses
        </Link>

        <Link href="/admin/students" className="sidebar-link">
          <Users size={18} /> Students
        </Link>

        <Link href="/admin/payments" className="sidebar-link">
          <CreditCard size={18} /> Payments
        </Link>

        <Link href="/admin/settings" className="sidebar-link">
          <Settings size={18} /> Settings
        </Link>
      </nav>
    </aside>
  );
}
