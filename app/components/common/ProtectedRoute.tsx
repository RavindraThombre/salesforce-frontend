"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  role?: "admin" | "student" | "trainer";
};

export default function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useUser();
  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ✅ DERIVED AUTH
  const isAuthenticated =
    !!token &&
    token !== "undefined" &&
    token !== "null" &&
    !!user;

  const isAuthorized =
    isAuthenticated &&
    (!role || user.role === role);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else if (!isAuthorized) {
      router.replace("/unauthorized");
    }
  }, [loading, isAuthenticated, isAuthorized, router]);

  // 🔥 BLOCK RENDER
  if (loading || !isAuthorized) return null;

  return <>{children}</>;
}