"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ResetPasswordCard from "./components/ResetPasswordCard";
import ResetPasswordSuccess from "./components/ResetPasswordSuccess";
import useResetPassword from "./hooks/useResetPassword";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const resetPassword = useResetPassword(token);

  if (!resetPassword.isTokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>

            <CardTitle className="text-2xl font-bold">
              Invalid Reset Link
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              This password reset link is invalid or missing.
            </p>
          </CardHeader>

          <CardContent>
            <Button asChild className="w-full">
              <Link href="/auth/forgot-password">Request New Reset Link</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (resetPassword.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <ResetPasswordSuccess />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <ResetPasswordCard
        form={resetPassword.form}
        loading={resetPassword.loading}
        onChange={resetPassword.handleChange}
        onSubmit={resetPassword.handleSubmit}
      />
    </div>
  );
}
