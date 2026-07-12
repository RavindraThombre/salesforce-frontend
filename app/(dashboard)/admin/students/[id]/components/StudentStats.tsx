"use client";

import { BookOpen, IndianRupee, Award } from "lucide-react";

import StatCard from "@/app/components/dashboard/StatCard";

type Props = {
  totalCourses: number;
  totalPayments: number;
  totalCertificates: number;
};

export default function StudentStats({
  totalCourses,
  totalPayments,
  totalCertificates,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Enrolled Courses"
        value={totalCourses}
        icon={<BookOpen size={20} />}
        trend="Active Learning"
      />

      <StatCard
        title="Total Payments"
        value={`₹${totalPayments.toLocaleString("en-IN")}`}
        icon={<IndianRupee size={20} />}
        trend="Lifetime Payments"
      />

      <StatCard
        title="Certificates"
        value={totalCertificates}
        icon={<Award size={20} />}
        trend="Achievements Earned"
      />
    </div>
  );
}
