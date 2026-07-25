"use client";

import { UserRound } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
          <UserRound className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information, contact details, and account
            security.
          </p>
        </div>
      </div>
    </div>
  );
}
