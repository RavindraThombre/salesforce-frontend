"use client";

import { apiClient } from "@/app/lib/axiosConfig";
import { useEffect, useState } from "react";

import DashboardHeader from "./components/DashboardHeader";
import DashboardFilters from "./components/DashboardFilters";
import DashboardStats from "./components/DashboardStats";
import RevenueChart from "./components/RevenueChart";
import StudentGrowthChart from "./components/StudentGrowthChart";
import RecentUsers from "./components/RecentUsers";
import RecentPayments from "./components/RecentPayments";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";

type DashboardData = {
  totalStudents: number;
  totalAdmins: number;
  totalCourses: number;
  totalClasses: number;
  totalRevenue: number;
  totalTrainers: number;

  studentGrowthData: {
    month: string;
    students: number;
  }[];

  revenueData: {
    month: string;
    revenue: number;
  }[];

  recentUsers: {
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }[];

  recentPayments: {
    amount: number;
    createdAt: string;
  }[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get(
        `dashboard/admin?year=${year}&month=${month}`,
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <SalesforceLoader />;
  }

  if (!data) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold sm:text-xl">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          min-w-0
          space-y-5
          px-3
          py-4

          min-[390px]:px-4
          sm:space-y-6
          sm:px-5
          sm:py-5
          md:space-y-8
          md:px-6
          md:py-6

          animate-in
          fade-in
          duration-500
        "
      >
        <div className="w-full min-w-0">
          <DashboardHeader />
        </div>

        <div className="w-full min-w-0">
          <DashboardFilters
            onChange={({ year, month }) => {
              setYear(year);
              setMonth(month);
            }}
            onApply={fetchDashboardData}
          />
        </div>

        <div className="w-full min-w-0">
          <DashboardStats
            totalStudents={data.totalStudents}
            totalCourses={data.totalCourses}
            totalRevenue={data.totalRevenue}
            totalClasses={data.totalClasses}
            totalTrainers={data.totalTrainers}
            totalAdmins={data.totalAdmins}
          />
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="min-w-0">
            <RevenueChart data={data.revenueData} />
          </div>

          <div className="min-w-0">
            <StudentGrowthChart data={data.studentGrowthData} />
          </div>
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="min-w-0">
            <RecentPayments payments={data.recentPayments} />
          </div>

          <div className="min-w-0">
            <RecentUsers users={data.recentUsers} />
          </div>
        </div>
      </div>
    </main>
  );
}
