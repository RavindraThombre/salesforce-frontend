"use client";

import { useRouter } from "next/navigation";

import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { CareerJob } from "../../lib/careers.types";
import { useUser } from "@/app/context/UserContext";

interface JobSidebarProps {
  job: CareerJob;
}

export default function JobSidebar({ job }: JobSidebarProps) {
  const { user } = useUser();
  const router = useRouter();

  const handleApply = () => {
    const redirectUrl = `/careers/${job.slug}/apply`;

    if (!user) {
      router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    router.push(redirectUrl);
  };

  return (
    <div className="sticky top-24 h-fit">
      <Card className="overflow-hidden">
        <div className="bg-primary p-6 text-primary-foreground">
          <Badge variant="secondary" className="mb-3">
            {job.employmentType}
          </Badge>

          <h2 className="text-2xl font-bold">{job.title}</h2>

          <p className="mt-2 text-primary-foreground/80">
            Join our growing team and shape the future with us.
          </p>
        </div>

        <CardContent className="space-y-5 p-6">
          <div className="space-y-4">
            <InfoRow
              icon={<MapPin className="h-5 w-5" />}
              label="Location"
              value={job.location}
            />

            <InfoRow
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              label="Experience"
              value={`${job.experience.min} - ${job.experience.max} Years`}
            />

            <InfoRow
              icon={<IndianRupee className="h-5 w-5" />}
              label="Salary"
              value={`₹${job.salary.min.toLocaleString(
                "en-IN",
              )} - ₹${job.salary.max.toLocaleString("en-IN")}`}
            />

            <InfoRow
              icon={<Users className="h-5 w-5" />}
              label="Openings"
              value={`${job.openings}`}
            />

            <InfoRow
              icon={<Clock3 className="h-5 w-5" />}
              label="Employment"
              value={job.employmentType}
            />
          </div>

          <Button size="lg" className="w-full" onClick={handleApply}>
            Apply Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            It only takes a few minutes to complete your application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
