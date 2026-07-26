"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForgotPasswordSuccessProps {
  email: string;
  onTryAgain: () => void;
}

export default function ForgotPasswordSuccess({
  email,
  onTryAgain,
}: ForgotPasswordSuccessProps) {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20 text-green-400">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <CardTitle className="text-3xl font-bold text-white">
          Check Your Email
        </CardTitle>

        <p className="text-sm leading-6 text-slate-300">
          If an account exists for this email, we&apos;ve sent a password reset
          link.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="font-medium text-white">{email}</p>
        </div>

        <p className="text-center text-xs leading-6 text-slate-400">
          The password reset link expires in 15 minutes. If you do not find it,
          please check your spam folder.
        </p>

        <Button
          variant="outline"
          onClick={onTryAgain}
          className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
        >
          Try Another Email
        </Button>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </CardContent>
    </Card>
  );
}
