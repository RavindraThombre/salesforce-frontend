"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";

type User = {
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type Props = {
  users: User[];
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function RecentUsers({ users }: Props) {
  return (
    <Card className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-primary/10 p-3">
            <UserRound className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Recent Users</h2>

            <p className="text-sm text-muted-foreground">
              Newly registered users
            </p>
          </div>
        </div>

        <Badge>{users.length}</Badge>
      </div>

      <div className="divide-y">
        {users.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No users found.
          </div>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {initials(user.name)}
                </div>

                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="text-right">
                <Badge variant="secondary" className="capitalize">
                  {user.role}
                </Badge>

                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
