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
  studentGrowthData: { month: string; students: number }[];
  revenueData: { month: string; revenue: number }[];
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Unable to load dashboard</h2>

          <p className="mt-2 text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <DashboardHeader />

      <DashboardFilters
        onChange={({ year, month }) => {
          setYear(year);
          setMonth(month);
        }}
        onApply={fetchDashboardData}
      />

      <DashboardStats
        totalStudents={data.totalStudents}
        totalCourses={data.totalCourses}
        totalRevenue={data.totalRevenue}
        totalClasses={data.totalClasses}
        totalTrainers={data.totalTrainers}
        totalAdmins={data.totalAdmins}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={data.revenueData} />
        <StudentGrowthChart data={data.studentGrowthData} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentPayments payments={data.recentPayments} />
        <RecentUsers users={data.recentUsers} />
      </div>
    </div>
  );
}
