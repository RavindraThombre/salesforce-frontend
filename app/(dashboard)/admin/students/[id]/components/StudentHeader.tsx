"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  studentName: string;
};

export default function StudentHeader({ studentName }: Props) {
  const router = useRouter();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10" />

      <div className="relative flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-11 w-11 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Student Details
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              View student profile, enrolled courses, payments and certificates.
            </p>

            <div className="mt-4 inline-flex items-center rounded-full border bg-background/80 px-3 py-1">
              <span className="text-sm font-semibold">{studentName}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 rounded-2xl border bg-background/80 px-5 py-4 backdrop-blur">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">{"Today's Date"}</p>

            <p className="font-semibold">{today}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
