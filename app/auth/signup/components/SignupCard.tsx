"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import GoogleLoginButton from "../../login/components/GoogleLoginButton";
import { SignupForm } from "../lib/signup.type";

interface SignupCardProps {
  form: SignupForm;
  loading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function SignupCard({
  form,
  loading,
  onChange,
  onSubmit,
}: SignupCardProps) {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold text-white">
          Create Account 🚀
        </CardTitle>

        <p className="text-sm text-slate-300">
          Join BlueCloud Mentor and start your Salesforce journey.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              Full Name
            </Label>

            <Input
              id="name"
              value={form.name}
              onChange={onChange}
              placeholder="John Doe"
              className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
            />
          </div>

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
              className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
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
              className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-200">
              Confirm Password
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="••••••••"
              className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Signup Button */}
          <Button
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
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-white/10" />

            <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-transparent px-2 text-xs text-slate-400">
              OR
            </span>
          </div>

          {/* Google Signup */}
          <GoogleLoginButton />

          {/* Login Link */}
          <p className="text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
