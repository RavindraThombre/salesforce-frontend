"use client";

import MonthYearPicker from "@/app/components/common/MonthYearPicker";
import StatCard from "@/app/components/dashboard/StatCard";
import { apiClient } from "@/app/lib/axiosConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, IndianRupee, Video } from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await apiClient.get("/dashboard/admin");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  const res = await apiClient.get(
    `dashboard/admin?year=${year}&month=${month}`
  );
  setData(res.data);
};


  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-bold">Admin Dashboard</h2> */}

      <div className="flex gap-4 mb-4 items-center">
  <MonthYearPicker
    onChange={({ year, month }) => {
      setYear(year);
      setMonth(month);
    }}
  />

  <Button
    onClick={fetchDashboardData}
    className="px-4 py-2 h-8 text-center  bg-primary  text-white rounded"
  >
    Apply
  </Button>
</div>

     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatCard
    title="Students"
    value={data?.totalStudents ?? 0}
    icon={<Users size={20} />}
    trend="+12% this month"
  />

  <StatCard
    title="Courses"
    value={data?.totalCourses ?? 0}
    icon={<BookOpen size={20} />}
  />

  <StatCard
    title="Revenue"
    value={`₹${data?.totalRevenue ?? 0}`}
    icon={<IndianRupee size={20} />}
    trend="+8% growth"
  />

  <StatCard
    title="Live Classes"
    value={data?.totalClasses ?? 0}
    icon={<Video size={20} />}
  />

  <StatCard
    title="Trainers"
    value={data?.totalTrainers ?? 0}
    icon={<Users size={20} />}
  />
</div>
      {/* REVENUE CHART */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Revenue Overview
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.revenueData ?? []}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="revenue" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* TWO COLUMN CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* STUDENT GROWTH */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Student Growth
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.studentGrowthData ?? []}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* LIVE CLASSES */}
        {/* <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Live Classes Timeline
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liveClassesData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="classes" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

      </div>

      {/* COURSE REVENUE
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Revenue by Course
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.topCourse ?? []}>
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card> */}

      <Card>
  <CardContent className="p-6">
    <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>

    <div className="space-y-3">
      {data?.recentPayments.map((p, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span>₹{p.amount}</span>
          <span className="text-muted-foreground">
            {new Date(p.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>


      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>

          <div className="space-y-3">
            {data?.recentUsers.map((user, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{user.email}</span>
                <span className="text-muted-foreground capitalize">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}