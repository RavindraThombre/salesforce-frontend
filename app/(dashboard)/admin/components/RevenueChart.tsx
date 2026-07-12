"use client";

import { Card } from "@/components/ui/card";
import { IndianRupee, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type RevenueData = {
  month: string;
  revenue: number;
};

type Props = {
  data: RevenueData[];
};

export default function RevenueChart({ data }: Props) {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Card className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-green-500/10 p-3">
            <IndianRupee className="h-6 w-6 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Revenue Overview</h2>

            <p className="text-sm text-muted-foreground">
              Monthly revenue analytics
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total Revenue</p>

          <h3 className="text-2xl font-bold text-green-600">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              opacity={0.2}
            />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
              labelFormatter={(label) => `Month : ${label}`}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "hsl(var(--primary))",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-emerald-600">
          <TrendingUp className="h-4 w-4" />
          Revenue Growth
        </div>

        <p className="text-sm text-muted-foreground">Monthly Performance</p>
      </div>
    </Card>
  );
}
