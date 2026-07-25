"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      const response = await apiClient.post("/auth/forgot-password", {
        email: normalizedEmail,
      });

      setSubmittedEmail(normalizedEmail);
      setEmailSent(true);

      toast.success(
        response.data?.message || "Password reset link sent successfully",
      );
    } catch (error: unknown) {
      console.error("Forgot password error:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Unable to send password reset email",
        );
      } else {
        toast.error("Unable to send password reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setEmailSent(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        {!emailSent ? (
          <>
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>

              <CardTitle className="text-2xl font-bold">
                Forgot your password?
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Enter the email address associated with your Salesforce Academy
                account. We&apos;ll send you a link to reset your password.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                    autoComplete="email"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>

              <CardTitle className="text-2xl font-bold">
                Check your email
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                If an account exists with this email, we sent a password reset
                link to:
              </p>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="rounded-lg border bg-muted/30 p-4 text-center">
                <p className="text-sm font-medium">{submittedEmail}</p>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                The password reset link expires in 15 minutes. Please check your
                spam folder if you don&apos;t see the email.
              </p>

              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
                onClick={handleTryAgain}
              >
                Try Another Email
              </Button>

              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
