import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { CareerJob } from "../../lib/careers.types";

interface JobHeaderProps {
  job: CareerJob;
}

export default function JobHeader({ job }: JobHeaderProps) {
  return (
    <section className="relative">
      {/* Banner */}
      <div className="relative h-[320px] overflow-hidden">
        <img
          src={job.banner}
          alt={job.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto -mt-24 px-4">
        <div className="rounded-3xl border bg-background p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left */}
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <Badge>{job.department}</Badge>

                <Badge variant="secondary">{job.employmentType}</Badge>
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {job.title}
                </h1>

                <p className="mt-2 text-lg text-muted-foreground">
                  Join our growing team and build amazing products that impact
                  thousands of learners.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />

                  {job.location}
                </div>

                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-primary" />
                  {job.experience.min} - {job.experience.max} Years
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {job.openings} Openings
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Posted{" "}
                  {new Date(job.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Salary Card */}
            <div className="w-full rounded-2xl border bg-muted/40 p-6 lg:max-w-xs">
              <p className="text-sm text-muted-foreground">Annual Salary</p>

              <h2 className="mt-2 text-3xl font-bold">
                ₹{job.salary.min.toLocaleString("en-IN")} - ₹
                {job.salary.max.toLocaleString("en-IN")}
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                Competitive salary with performance-based incentives and career
                growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
