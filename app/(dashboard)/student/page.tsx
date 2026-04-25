"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardData } from "./lib/dashboardType";

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // ================= FETCH =================
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiClient.get<DashboardData>("student/dashboard");
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  // ================= UPCOMING =================
  const upcoming = data?.upcomingClass;

  // ================= TIMER =================
  useEffect(() => {
    if (!upcoming?.date) return;

    const targetDate = new Date(upcoming.date).getTime();

    const interval = setInterval(() => {
      const diff = targetDate - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [upcoming?.date]);

  // ================= FORMAT =================
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);

    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // ================= LMS TIME LOGIC =================
  const CLASS_DURATION = 60 * 60 * 1000; // 60 min
  const JOIN_BEFORE = 10 * 60 * 1000; // 10 min

  const classStart = upcoming?.date
    ? new Date(upcoming.date).getTime()
    : 0;

  const now = Date.now();

  const isBeforeJoinWindow = classStart - now > JOIN_BEFORE;

  const isJoinWindow =
    classStart - now <= JOIN_BEFORE && classStart - now > 0;

  const isLive =
    now >= classStart && now <= classStart + CLASS_DURATION;

  const isEnded = now > classStart + CLASS_DURATION;

  // ================= LOADING =================
  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">Failed to load</div>;

  const courseProgress = data.courseProgress ?? [];
  const notifications = data.notifications ?? [];
  const activity = data.activity ?? [];

  return (
    <div className="space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-4">

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Courses</p>
            <h3 className="text-2xl font-bold">{data.totalCourses}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Live Classes</p>
            <h3 className="text-2xl font-bold">{data.totalLiveClasses}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Certificates</p>
            <h3 className="text-2xl font-bold">{data.totalCertificates}</h3>
          </CardContent>
        </Card>

      </div>

      {/* ================= UPCOMING CLASS ================= */}
      <Card className="border shadow-sm hover:shadow-md transition">
        <CardContent className="p-6 flex justify-between items-center">

          {upcoming ? (
            <>
              {/* LEFT */}
              <div className="space-y-2">

                {/* TITLE + STATUS */}
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">
                    {upcoming.topic}
                  </h3>

                  {isLive && (
                    <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded animate-pulse">
                      LIVE NOW
                    </span>
                  )}

                  {isJoinWindow && !isLive && (
                    <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                      JOINING SOON
                    </span>
                  )}

                  {isEnded && (
                    <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      ENDED
                    </span>
                  )}
                </div>

                {/* COURSE */}
                {upcoming.courseId?.title && (
                  <p className="text-sm text-muted-foreground">
                    {upcoming.courseId.title}
                  </p>
                )}

                {/* DATE */}
                <p className="text-sm text-muted-foreground">
                  {new Date(upcoming.date || "").toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  • {upcoming.time}
                </p>

                {/* COUNTDOWN */}
                {(isBeforeJoinWindow || isJoinWindow) && (
                  <p className="text-xs text-blue-600 font-medium">
                    Starts in {formatTime(classStart - now)}
                  </p>
                )}

              </div>

              {/* BUTTON */}
              <Button
                size="sm"
                disabled={isBeforeJoinWindow || isEnded}
                className={`px-5 ${
                  isLive
                    ? "bg-red-600 hover:bg-red-700"
                    : isJoinWindow
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : ""
                }`}
                onClick={() => {
                  if (upcoming?.zoomLink) {
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
              </Button>
            </>
          ) : (
            <div className="text-muted-foreground text-sm">
              No upcoming class scheduled
            </div>
          )}

        </CardContent>
      </Card>

      {/* ================= GRID ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* COURSE PROGRESS */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Course Progress</h3>

            {courseProgress.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No courses yet
              </p>
            )}

            {courseProgress.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm">
                  <span>{c.courseName}</span>
                  <span>{c.progress}%</span>
                </div>

                <div className="w-full bg-muted h-2 rounded mt-1">
                  <div
                    className="bg-primary h-2 rounded"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* NOTIFICATIONS */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Notifications</h3>

            {notifications.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No notifications
              </p>
            )}

            {notifications.map((n, i) => (
              <div key={i} className="text-sm border-b pb-2">
                <p>{n.message}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* ACTIVITY */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold">Recent Activity</h3>

          {activity.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No activity yet
            </p>
          )}

          {activity.map((a, i) => (
            <div key={i} className="flex justify-between text-sm border-b pb-2">
              <span>{a.text}</span>
              <span className="text-muted-foreground">
                {new Date(a.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}