"use client";

import { Card } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type StudentGrowthData = {
  month: string;
  students: number;
};

type Props = {
  data: StudentGrowthData[];
};

export default function StudentGrowthChart({ data }: Props) {
  const totalStudents = data.reduce((sum, item) => sum + item.students, 0);

  return (
    <Card className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-500/10 p-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Student Growth</h2>

            <p className="text-sm text-muted-foreground">
              Monthly student registrations
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total Students</p>

          <h3 className="text-2xl font-bold text-blue-600">
            {totalStudents.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              opacity={0.2}
            />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip
              formatter={(value) => [
                Number(value ?? 0).toLocaleString(),
                "Students",
              ]}
              labelFormatter={(label) => `Month : ${label}`}
            />

            <Bar
              dataKey="students"
              radius={[8, 8, 0, 0]}
              fill="hsl(var(--primary))"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <TrendingUp className="h-4 w-4" />
          Student Growth
        </div>

        <p className="text-sm text-muted-foreground">Monthly Enrollments</p>
      </div>
    </Card>
  );
}
