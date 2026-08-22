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
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
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
    await apiClient.put(`/notifications/${id}/read`);

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = async () => {
    await apiClient.put("/notifications/read-all");

    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
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
    user.role === "admin" ? "Admin Dashboard" : `${firstName} Dashboard`;

  return (
    <div className="flex h-16 w-full items-center justify-between overflow-hidden border-b bg-background px-2 min-[390px]:px-3 sm:px-4 md:px-5">
      <div className="min-w-0 flex-1 overflow-hidden pt-2 md:pt-1.5">
        <h2
          className="
      truncate
      text-sm
      font-semibold
      leading-tight
      min-[390px]:text-[15px]
      sm:text-base
      md:text-base
    "
        >
          {title}
        </h2>

        <div className="mt-0.5 min-w-0 overflow-hidden">
          <Breadcrumb />
        </div>
      </div>
      {/* RIGHT */}
      <div
        className="
      ml-1
      flex
      shrink-0
      items-center
      gap-0.5
      min-[390px]:ml-2
      min-[390px]:gap-1
      sm:gap-2
      md:gap-3
    "
      >
        {/* THEME */}
        <div className="shrink-0 scale-90 min-[390px]:scale-100">
          <ThemeToggle />
        </div>

        {/* ================= NOTIFICATIONS ================= */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="
              relative
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-md
              transition-colors
              hover:bg-muted
              min-[390px]:h-9
              min-[390px]:w-9
              sm:h-10
              sm:w-10
            "
              aria-label="Notifications"
            >
              <Bell
                className="
                h-4
                w-4
                min-[390px]:h-[18px]
                min-[390px]:w-[18px]
                sm:h-5
                sm:w-5
              "
              />

              {unreadCount > 0 && (
                <span
                  className="
                  absolute
                  -right-0.5
                  -top-0.5
                  flex
                  min-w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[8px]
                  leading-4
                  text-white
                  min-[390px]:text-[9px]
                  sm:text-[10px]
                "
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
            w-[calc(100vw-16px)]
            max-w-80
            overflow-hidden
            p-0
            min-[390px]:w-[calc(100vw-24px)]
            sm:w-80
          "
          >
            <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
              <span className="truncate font-semibold">Notifications</span>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="shrink-0 text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <DropdownMenuSeparator />

            <div className="max-h-[60dvh] overflow-x-hidden overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => markAsRead(n._id)}
                    className={`flex cursor-pointer gap-2 overflow-hidden border-b px-3 py-3 sm:px-4 ${
                      !n.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                  >
                    {!n.isRead && (
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{n.title}</p>

                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {n.desc}
                      </p>

                      <span className="block truncate text-[10px] text-muted-foreground">
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
            <button
              type="button"
              className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-primary
              text-[10px]
              font-semibold
              text-white
              min-[390px]:h-9
              min-[390px]:w-9
              min-[390px]:text-xs
              sm:text-sm
            "
              aria-label="Profile menu"
            >
              {initial}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
            w-[calc(100vw-16px)]
            max-w-64
            overflow-hidden
            min-[390px]:w-[calc(100vw-24px)]
            sm:w-64
          "
          >
            <DropdownMenuLabel className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white">
                {initial}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">
                  {user.email}
                </span>

                <span className="truncate text-xs capitalize text-muted-foreground">
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
                      : "/student/profile",
                )
              }
            >
              <User size={16} className="mr-2 shrink-0" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut size={16} className="mr-2 shrink-0" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
