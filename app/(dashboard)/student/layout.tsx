"use client";

import ProtectedRoute from "@/app/components/common/ProtectedRoute";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute role="student">{children}</ProtectedRoute>;
}