"use client";

import {
  BookOpen,
  Users,
  IndianRupee,
  Video,
  ShieldCheck,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

type Props = {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  totalClasses: number;
  totalTrainers: number;
  totalAdmins: number;
};

export default function DashboardStats({
  totalStudents,
  totalCourses,
  totalRevenue,
  totalClasses,
  totalTrainers,
  totalAdmins,
}: Props) {
  const stats = [
    {
      title: "Students",
      value: totalStudents.toLocaleString(),
      icon: Users,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      trend: "+12%",
    },
    {
      title: "Courses",
      value: totalCourses.toLocaleString(),
      icon: BookOpen,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
      trend: "+5%",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600",
      trend: "+8%",
    },
    {
      title: "Live Classes",
      value: totalClasses.toLocaleString(),
      icon: Video,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-600",
      trend: "+4%",
    },
    {
      title: "Trainers",
      value: totalTrainers.toLocaleString(),
      icon: GraduationCap,
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-600",
      trend: "+2%",
    },
    {
      title: "Admins",
      value: totalAdmins.toLocaleString(),
      icon: ShieldCheck,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-600",
      trend: "+1%",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    {item.value}
                  </h2>

                  <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {item.trend} this month
                  </div>
                </div>

                <div
                  className={`rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}
                >
                  <Icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
