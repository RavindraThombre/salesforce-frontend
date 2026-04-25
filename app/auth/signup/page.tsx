"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  if (form.password !== form.confirmPassword) {
    toast.error("Passwords do not match");
    setLoading(false);
    return;
  }

  try {
    const res = await apiClient.post("auth/signup", {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    toast.success(res.data.message || "Account created successfully! Please login.");
    setTimeout(() => {
      router.push("/auth/login");
    }, 1200);
    // router.navigate("/auth/login");
    console.log(res.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
    alert(err.response?.data?.message || "API Error");
  } else {
    alert("Unexpected error");
  }
  } finally {
    setLoading(false);
  }
};

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create your account 🚀
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Join Salesforce Academy and start learning
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Enter name.." onChange={handleChange} />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email..." onChange={handleChange} />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" onChange={handleChange} />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                onChange={handleChange}
              />
            </div>

            {/* Signup Button */}
            <Button className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-background px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            {/* Google Signup */}
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
