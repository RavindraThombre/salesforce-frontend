"use client";

import { MessageSquareText, Star, BadgeCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface TestimonialStatsProps {
  total: number;
  averageRating: number;
  fiveStarCount: number;
}

export default function TestimonialStats({
  total,
  averageRating,
  fiveStarCount,
}: TestimonialStatsProps) {
  const stats = [
    {
      title: "Total Testimonials",
      value: total,
      icon: MessageSquareText,
      description: "Student reviews",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      description: "Out of 5.0",
    },
    {
      title: "5-Star Reviews",
      value: fiveStarCount,
      icon: BadgeCheck,
      description: "Excellent feedback",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className="shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
