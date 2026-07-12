"use client";

import { Card } from "@/components/ui/card";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  BookOpen,
  Award,
  Video,
} from "lucide-react";
import { ActivityItem } from "../lib/dashboardType";

type Props = {
  activity: ActivityItem[];
};

function getActivityIcon(text: string) {
  const value = text.toLowerCase();

  if (value.includes("certificate")) {
    return Award;
  }

  if (value.includes("course")) {
    return BookOpen;
  }

  if (value.includes("class")) {
    return Video;
  }

  return CheckCircle2;
}

function getTimeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);

  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default function ActivityCard({ activity }: Props) {
  return (
    <Card className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-500/10 p-3">
            <Activity className="h-6 w-6 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Recent Activity</h2>

            <p className="text-sm text-muted-foreground">
              Your latest learning activities
            </p>
          </div>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {activity.length}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        {activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Activity className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">No Activity Yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Your learning journey will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activity.map((item, index) => {
              const Icon = getActivityIcon(item.text);

              return (
                <div key={index} className="group relative flex gap-4">
                  {/* Timeline */}
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:scale-105">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    {index !== activity.length - 1 && (
                      <div className="mt-2 h-full w-px bg-border" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border bg-muted/30 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-muted/60">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <h3 className="font-medium leading-6">{item.text}</h3>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />

                        <span>
                          {new Date(item.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                      {getTimeAgo(item.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
