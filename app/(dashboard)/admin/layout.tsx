"use client";

import ProtectedRoute from "@/app/components/common/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute roles={["admin"]}>{children}</ProtectedRoute>;
}
