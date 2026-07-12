"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
import { DashboardData } from "./lib/dashboardType";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";
import ActivityCard from "./components/ActivityCard";
import NotificationsCard from "./components/NotificationsCard";
import CourseProgressCard from "./components/CourseProgressCard";
import UpcomingClassCard from "./components/UpcomingClassCard";
import DashboardStats from "./components/DashboardStats";
import DashboardHeader from "./components/DashboardHeader";

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

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
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!upcoming?.date) return;

    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
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

  const classStart = upcoming?.date ? new Date(upcoming.date).getTime() : 0;

  const now = Date.now();

  const isBeforeJoinWindow = classStart - now > JOIN_BEFORE;

  const isJoinWindow = classStart - now <= JOIN_BEFORE && classStart - now > 0;

  const isLive = now >= classStart && now <= classStart + CLASS_DURATION;

  const isEnded = now > classStart + CLASS_DURATION;

  // ================= LOADING =================
  if (loading) return <SalesforceLoader />;
  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Unable to load data</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please refresh the page or try again later.
          </p>
        </div>
      </div>
    );
  }

  const courseProgress = data.courseProgress ?? [];
  const notifications = data.notifications ?? [];
  const activity = data.activity ?? [];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Stats */}
      <DashboardStats
        totalCourses={data.totalCourses}
        totalLiveClasses={data.totalLiveClasses}
        totalCertificates={data.totalCertificates}
      />

      {/* Upcoming Live Class */}
      <UpcomingClassCard
        upcoming={upcoming}
        isLive={isLive}
        isJoinWindow={isJoinWindow}
        isBeforeJoinWindow={isBeforeJoinWindow}
        isEnded={isEnded}
        classStart={classStart}
        now={now}
        formatTime={formatTime}
      />

      {/* Progress + Notifications */}
      <div className="grid gap-6 xl:grid-cols-2">
        <CourseProgressCard courseProgress={courseProgress} />

        <NotificationsCard notifications={notifications} />
      </div>

      {/* Recent Activity */}
      <ActivityCard activity={activity} />
    </div>
  );
}
