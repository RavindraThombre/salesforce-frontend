"use client";

import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CareerJob } from "../lib/careers.types";

interface CareersJobCardProps {
  job: CareerJob;
}

export default function CareersJobCard({ job }: CareersJobCardProps) {
  return (
    <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={job.banner}
          alt={job.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <Badge className="absolute right-4 top-4">{job.employmentType}</Badge>
      </div>

      <CardContent className="space-y-5 p-6">
        <div>
          <h3 className="line-clamp-1 text-xl font-bold">{job.title}</h3>

          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />

            <span>{job.department}</span>
          </div>
        </div>

        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />

            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-primary" />

            <span>
              {job.experience.min} - {job.experience.max} Years
            </span>
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-primary" />

            <span>
              ₹{job.salary.min.toLocaleString("en-IN")} - ₹
              {job.salary.max.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />

            <span>{job.openings} Openings</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />

            <span>
              {new Date(job.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={`/careers/${job.slug}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
