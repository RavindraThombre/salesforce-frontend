"use client";

import { BookOpen, Video, Award } from "lucide-react";

import { Card } from "@/components/ui/card";

type Props = {
  totalCourses: number;
  totalLiveClasses: number;
  totalCertificates: number;
};

export default function DashboardStats({
  totalCourses,
  totalLiveClasses,
  totalCertificates,
}: Props) {
  const stats = [
    {
      title: "Courses",
      value: totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      title: "Live Classes",
      value: totalLiveClasses,
      icon: Video,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
    },
    {
      title: "Certificates",
      value: totalCertificates,
      icon: Award,
      color: "text-green-600",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="rounded-3xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <h2 className="mt-3 text-4xl font-bold">{item.value}</h2>
              </div>

              <div className={`rounded-2xl p-4 ${item.bg}`}>
                <Icon className={`h-7 w-7 ${item.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
