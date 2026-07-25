"use client";

import { FileText, CalendarDays, Clock3 } from "lucide-react";

interface BlogStatsProps {
  totalBlogs: number;
  blogsThisMonth: number;
  latestBlogDate?: string;
}

export default function BlogStats({
  totalBlogs,
  blogsThisMonth,
  latestBlogDate,
}: BlogStatsProps) {
  const stats = [
    {
      title: "Total Blogs",
      value: totalBlogs,
      icon: FileText,
    },
    {
      title: "This Month",
      value: blogsThisMonth,
      icon: CalendarDays,
    },
    {
      title: "Latest Post",
      value: latestBlogDate ?? "--",
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
