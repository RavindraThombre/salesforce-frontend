"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { Bell, LogOut, User } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
import Breadcrumb from "../common/Breadcrumb";

/* ---------------- TYPES ---------------- */

type NotificationItem = {
  _id: string;
  title: string;
  desc: string;
  createdAt: string;
  isRead: boolean;
};

export default function DashboardTopbar() {
  const { user, logout } = useUser();
  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  /* ---------------- FETCH ---------------- */
 useEffect(() => {
  const fetchNotifications = async () => {
    const res = await apiClient.get<NotificationItem[]>("/notifications");

    setNotifications(
      (res.data ?? []).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
    );
  };

  fetchNotifications(); // ✅ ADD THIS

  const interval = setInterval(fetchNotifications, 15000);
  return () => clearInterval(interval);
}, []);
 

  /* ---------------- UNREAD COUNT ---------------- */

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  /* ---------------- ACTIONS ---------------- */

  const markAsRead = async (id: string) => {
    await apiClient.put(`/notifications/${id}/read`)

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = async () => {
    await apiClient.put("/notifications/read-all")

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  if (!user) return null;

  const initial = user.email.charAt(0).toUpperCase();
  const nameFromEmail = user.email.split("@")[0];
  const firstName =
    nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  const handleLogout = () => {
  // ✅ REMOVE TOKEN
  localStorage.removeItem("token");

  // ✅ REMOVE ANY STORED DATA
  localStorage.removeItem("redirectAfterLogin");
  sessionStorage.removeItem("selectedCourse");

  // ✅ CLEAR CONTEXT
  logout();

  // ✅ REDIRECT
  router.push("/login");
};

  const title =
    user.role === "admin"
      ? "Admin Dashboard"
      : `${firstName} Dashboard`;

  return (
    <div className="h-16 border-b flex items-center justify-between px-6 bg-background">

      {/* LEFT */}
      <div className="flex flex-col gap-1">
      <h2 className="font-semibold text-lg mt-3">{title}</h2>
      <Breadcrumb />
    </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <ThemeToggle />

        {/* ================= NOTIFICATIONS ================= */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-md hover:bg-muted">
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 p-0">

            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3">
              <span className="font-semibold">Notifications</span>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <DropdownMenuSeparator />

            {/* LIST */}
            <div className="max-h-80 overflow-y-auto">

              {notifications.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-6">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => markAsRead(n._id)}
                    className={`px-4 py-3 cursor-pointer border-b flex gap-2 ${
                      !n.isRead
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                  >
                    {!n.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    )}

                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {n.desc}
                      </p>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </DropdownMenuContent>
        </DropdownMenu>

        {/* ================= PROFILE ================= */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {initial}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                {initial}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium truncate">
                  {user.email}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
               router.push(
                user.role === "admin"
                  ? "/admin/settings"
                  : user.role === "trainer"
                  ? "/trainer/profile"
                  : "/student/profile"
              )}
            >
              <User size={16} className="mr-2" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
}