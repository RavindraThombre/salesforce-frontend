"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordCardProps {
  email: string;
  loading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function ForgotPasswordCard({
  email,
  loading,
  onChange,
  onSubmit,
}: ForgotPasswordCardProps) {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
          <Mail className="h-6 w-6" />
        </div>

        <CardTitle className="text-3xl font-bold text-white">
          Forgot Password?
        </CardTitle>

        <p className="text-sm leading-6 text-slate-300">
          Enter your registered email address and We&apos;ll send you a password
          reset link.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email Address
            </Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="you@example.com"
              disabled={loading}
              className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="
              h-11
              w-full
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              hover:from-cyan-400
              hover:to-blue-500
            "
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
            className="flex items-center justify-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
