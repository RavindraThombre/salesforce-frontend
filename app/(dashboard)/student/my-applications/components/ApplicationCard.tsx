"use client";

import Link from "next/link";
import {
  Building2,
  CalendarDays,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { MyApplication } from "../lib/myApplications.type";
import ApplicationStatusChip from "./ApplicationStatusChip";

interface ApplicationCardProps {
  application: MyApplication;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const { job } = application;

  const appliedDate = new Date(application.appliedAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardContent className="flex-1 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">
              {job?.title ?? "Job no longer available"}
            </h3>

            {job?.department && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 shrink-0" />

                <span>{job.department}</span>
              </div>
            )}
          </div>

          <ApplicationStatusChip status={application.status} />
        </div>

        <div className="mt-6 space-y-3">
          {job?.employmentType && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <BriefcaseBusiness className="h-4 w-4 shrink-0" />

              <span>{job.employmentType}</span>
            </div>
          )}

          {job?.location && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />

              <span>{job.location}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0" />

            <span>Applied on {appliedDate}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/20 p-4">
        {job ? (
          <Button asChild variant="outline" className="w-full">
            <Link href={`/careers/${job.slug}`}>View Job</Link>
          </Button>
        ) : (
          <Button disabled variant="outline" className="w-full">
            Job Unavailable
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
