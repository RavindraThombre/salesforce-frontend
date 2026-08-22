"use client";

import Link from "next/link";
import { ChangeEvent } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "./GoogleLoginButton";

export interface LoginForm {
  email: string;
  password: string;
}

interface LoginCardProps {
  form: LoginForm;
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleLogin: (credential: string) => void;
}

export default function LoginCard({
  form,
  loading,
  onChange,
  onSubmit,
  onGoogleLogin,
}: LoginCardProps) {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold text-white">
          Welcome Back 👋
        </CardTitle>

        <p className="text-sm text-slate-300">
          Sign in to continue your learning journey.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email */}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="
                border-white/20
                bg-white/5
                text-white
                placeholder:text-slate-400
              "
            />
          </div>

          {/* Password */}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              className="
                border-white/20
                bg-white/5
                text-white
                placeholder:text-slate-400
              "
            />
          </div>

          <div className="flex justify-end">
            <Link
              href={{
                pathname: "/auth/forgot-password",
                query: form.email
                  ? {
                      email: form.email.trim().toLowerCase(),
                    }
                  : {},
              }}
              className="text-sm text-cyan-300 hover:text-cyan-200"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            className="
              w-full
              cursor-pointer
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              hover:from-cyan-400
              hover:to-blue-500
            "
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="relative">
            <Separator className="bg-white/10" />

            <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-transparent px-2 text-xs text-slate-400">
              OR
            </span>
          </div>

          <GoogleLoginButton loading={loading} onSuccess={onGoogleLogin} />

          <p className="text-center text-sm text-slate-300">
            Don not have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
