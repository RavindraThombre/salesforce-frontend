"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
};

export default function StatCard({ title, value, icon, trend }: Props) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="px-4 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{title}</p>

          <h3 className="text-xl font-semibold">{value}</h3>

          {trend && (
            <p className="text-[11px] text-green-600">{trend}</p>
          )}
        </div>

        {/* RIGHT ICON */}
        <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition">
          <div className="text-muted-foreground group-hover:text-primary transition">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}