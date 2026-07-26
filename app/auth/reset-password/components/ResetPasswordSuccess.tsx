"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordSuccess() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>

        <CardTitle className="text-2xl font-bold">
          Password Reset Successful
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Your password has been updated successfully. You can now log in using
          your new password.
        </p>
      </CardHeader>

      <CardContent>
        <Button asChild className="w-full">
          <Link href="/auth/login">Go to Login</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
