"use client";

import { GraduationCap, UserCheck, UserX } from "lucide-react";

import StatCard from "@/app/components/dashboard/StatCard";

type Props = {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
};

export default function StudentsStats({
  totalStudents,
  activeStudents,
  inactiveStudents,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Students"
        value={totalStudents}
        icon={<GraduationCap size={20} />}
        trend={`${activeStudents} Active`}
      />

      <StatCard
        title="Active Students"
        value={activeStudents}
        icon={<UserCheck size={20} />}
        trend={`${Math.round(
          (activeStudents / Math.max(totalStudents, 1)) * 100,
        )}% Active`}
      />

      <StatCard
        title="Inactive Students"
        value={inactiveStudents}
        icon={<UserX size={20} />}
        trend={`${Math.round(
          (inactiveStudents / Math.max(totalStudents, 1)) * 100,
        )}% Inactive`}
      />
    </div>
  );
}
