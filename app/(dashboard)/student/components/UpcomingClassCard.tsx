"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays, Clock3, Video, ArrowRight } from "lucide-react";
import { UpcomingClass } from "../lib/dashboardType";

type Props = {
  upcoming: UpcomingClass | null | undefined;
  isLive: boolean;
  isJoinWindow: boolean;
  isBeforeJoinWindow: boolean;
  isEnded: boolean;
  classStart: number;
  now: number;
  formatTime: (ms: number) => string;
};

export default function UpcomingClassCard({
  upcoming,
  isLive,
  isJoinWindow,
  isBeforeJoinWindow,
  isEnded,
  classStart,
  now,
  formatTime,
}: Props) {
  if (!upcoming) {
    return (
      <div className="rounded-3xl border bg-card p-10 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center">
          <Video className="mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="text-lg font-semibold">No Upcoming Live Class</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            You are all caught up! Check back later for new live sessions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary to-indigo-600 px-6 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm opacity-90">Upcoming Live Session</p>

            <h2 className="mt-1 text-2xl font-bold">{upcoming.topic}</h2>
          </div>

          {isLive && (
            <span className="rounded-full bg-red-500 px-4 py-1 text-xs font-semibold animate-pulse">
              🔴 LIVE NOW
            </span>
          )}

          {!isLive && isJoinWindow && (
            <span className="rounded-full bg-yellow-400 px-4 py-1 text-xs font-semibold text-black">
              Joining Soon
            </span>
          )}

          {isEnded && (
            <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-semibold">
              Ended
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-8 p-6 lg:grid-cols-[1fr_auto]">
        {/* Left */}
        <div className="space-y-5">
          {upcoming.courseId?.title && (
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Course
              </p>

              <p className="mt-1 font-semibold">{upcoming.courseId.title}</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
              <CalendarDays className="h-5 w-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">Date</p>

                <p className="font-medium">
                  {new Date(upcoming.date || "").toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
              <Clock3 className="h-5 w-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">Time</p>

                <p className="font-medium">{upcoming.time}</p>
              </div>
            </div>
          </div>

          {(isBeforeJoinWindow || isJoinWindow) && (
            <div className="rounded-xl bg-primary/10 p-4">
              <p className="text-xs uppercase text-primary">Countdown</p>

              <p className="mt-1 text-xl font-bold text-primary">
                {formatTime(classStart - now)}
              </p>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex min-w-[220px] flex-col justify-center gap-4">
          <Button
            size="lg"
            disabled={isBeforeJoinWindow || isEnded}
            className={`w-full rounded-xl text-base ${
              isLive
                ? "bg-red-600 hover:bg-red-700"
                : isJoinWindow
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : ""
            }`}
            onClick={() => {
              if (upcoming.zoomLink) {
                window.open(upcoming.zoomLink, "_blank");
              }
            }}
          >
            {isEnded
              ? "Class Ended"
              : isBeforeJoinWindow
                ? "Not Started"
                : isJoinWindow
                  ? "Join Soon"
                  : "Join Now"}

            {!isEnded && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Securely join your instructor-led live session.
          </p>
        </div>
      </div>
    </div>
  );
}
