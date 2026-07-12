"use client";

import { Card } from "@/components/ui/card";
import { Bell, BellRing, Clock3 } from "lucide-react";
import { NotificationItem } from "../lib/dashboardType";

type Props = {
  notifications: NotificationItem[];
};

function getTimeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);

  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);

  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);

  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default function NotificationsCard({ notifications }: Props) {
  return (
    <Card className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-amber-500/10 p-3">
            <BellRing className="h-6 w-6 text-amber-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Notifications</h2>

            <p className="text-sm text-muted-foreground">
              Latest updates from BlueCloudMentor
            </p>
          </div>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {notifications.length}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Bell className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">No Notifications</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              You are all caught up.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border bg-muted/30 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-muted/60 hover:shadow-sm"
              >
                {/* Timeline */}
                {index !== notifications.length - 1 && (
                  <div className="absolute left-7 top-12 h-8 w-px bg-border" />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BellRing className="h-5 w-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="leading-6">{notification.message}</p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />

                      <span>{getTimeAgo(notification.createdAt)}</span>

                      <span>•</span>

                      <span>
                        {new Date(notification.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Unread Dot */}
                  <div className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
