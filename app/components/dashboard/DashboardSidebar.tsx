"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  User,
  Video,
  Award,
  Menu,
  Mail,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const cleanPath = pathname.replace("/salesforce-academy", "");

  const isAdmin = cleanPath.startsWith("/admin");
  const isStudent = cleanPath.startsWith("/student");
  const isTrainer = cleanPath.startsWith("/trainer");

  const isActive = (path: string) => {
    if (path === "/") {
      return cleanPath === "/";
    }
    if (path === "/admin" || path === "/student" || path === "/trainer") {
      return cleanPath === path;
    }
    return cleanPath.startsWith(path);
  };

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
      isActive(path)
        ? "bg-primary text-white"
        : "text-muted-foreground hover:bg-muted"
    }`;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-background border-r hidden md:flex flex-col transition-all duration-300`}
    >
      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <Link
            href="/"
            className="flex flex-col leading-tight hover:opacity-90 transition"
          >
            <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              BlueCloudMentor
            </span>
            {!collapsed && (
              <span className="text-[10px] text-muted-foreground">
                Learn. Build. Grow.
              </span>
            )}
          </Link>
        )}

        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 space-y-2">
        {/* ADMIN */}
        {isAdmin && (
          <>
            <Link href="/" className={linkClass("/")}>
              <Home size={18} />
              {!collapsed && "Home"}
            </Link>
            <Link href="/admin" className={linkClass("/admin")}>
              <LayoutDashboard size={18} />
              {!collapsed && "Dashboard"}
            </Link>

            <Link href="/admin/courses" className={linkClass("/admin/courses")}>
              <BookOpen size={18} />
              {!collapsed && "Courses"}
            </Link>

            <Link
              href="/admin/students"
              className={linkClass("/admin/students")}
            >
              <Users size={18} />
              {!collapsed && "Students"}
            </Link>

            <Link
              href="/admin/live-classes"
              className={linkClass("/admin/live-classes")}
            >
              <Video size={18} />
              {!collapsed && "Live Classes"}
            </Link>

            <Link
              href="/admin/payments"
              className={linkClass("/admin/payments")}
            >
              <CreditCard size={18} />
              {!collapsed && "Payments"}
            </Link>

            <Link href="/admin/blog" className={linkClass("/admin/blog")}>
              <BookOpen size={18} />
              {!collapsed && "Blog"}
            </Link>

            <Link
              href="/admin/testimonials"
              className={linkClass("/admin/testimonials")}
            >
              <Award size={18} />
              {!collapsed && "Testimonials"}
            </Link>

            <Link
              href="/admin/settings"
              className={linkClass("/admin/settings")}
            >
              <Settings size={18} />
              {!collapsed && "Settings"}
            </Link>

            <Link
              href="/admin/trainers"
              className={linkClass("/admin/trainers")}
            >
              <User size={18} />
              {!collapsed && "Trainers"}
            </Link>

            <Link href="/admin/contact" className={linkClass("/admin/contact")}>
              <Mail size={18} />
              {!collapsed && "Contact"}
            </Link>
          </>
        )}

        {/* STUDENT */}
        {isStudent && (
          <>
            <Link href="/" className={linkClass("/")}>
              <Home size={18} />
              {!collapsed && "Home"}
            </Link>
            <Link href="/student" className={linkClass("/student")}>
              <LayoutDashboard size={18} />
              {!collapsed && "Dashboard"}
            </Link>

            <Link
              href="/student/courses"
              className={linkClass("/student/courses")}
            >
              <BookOpen size={18} />
              {!collapsed && "My Courses"}
            </Link>

            <Link
              href="/student/live-classes"
              className={linkClass("/student/live-classes")}
            >
              <Video size={18} />
              {!collapsed && "Live Classes"}
            </Link>

            <Link
              href="/student/certificates"
              className={linkClass("/student/certificates")}
            >
              <Award size={18} />
              {!collapsed && "Certificates"}
            </Link>

            <Link
              href="/student/payments"
              className={linkClass("/student/payments")}
            >
              <CreditCard size={18} />
              {!collapsed && "Payments"}
            </Link>

            <Link
              href="/student/profile"
              className={linkClass("/student/profile")}
            >
              <User size={18} />
              {!collapsed && "Profile"}
            </Link>
          </>
        )}

        {/* TRAINER */}
        {isTrainer && (
          <>
            <Link href="/trainer" className={linkClass("/trainer")}>
              <Home size={18} />
              {!collapsed && "Dashboard"}
            </Link>

            <Link
              href="/trainer/classes"
              className={linkClass("/trainer/classes")}
            >
              <Video size={18} />
              {!collapsed && "My Classes"}
            </Link>

            <Link
              href="/trainer/profile"
              className={linkClass("/trainer/profile")}
            >
              <User size={18} />
              {!collapsed && "Profile"}
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
