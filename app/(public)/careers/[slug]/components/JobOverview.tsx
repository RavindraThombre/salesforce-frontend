import {
  BriefcaseBusiness,
  Building2,
  Clock3,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { CareerJob } from "../../lib/careers.types";

interface JobOverviewProps {
  job: CareerJob;
}

export default function JobOverview({ job }: JobOverviewProps) {
  const overviewItems = [
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Location",
      value: job.location,
    },
    {
      icon: <BriefcaseBusiness className="h-5 w-5 text-primary" />,
      title: "Experience",
      value: `${job.experience.min} - ${job.experience.max} Years`,
    },
    {
      icon: <IndianRupee className="h-5 w-5 text-primary" />,
      title: "Salary",
      value: `₹${job.salary.min.toLocaleString(
        "en-IN",
      )} - ₹${job.salary.max.toLocaleString("en-IN")}`,
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Openings",
      value: `${job.openings} Position${job.openings > 1 ? "s" : ""}`,
    },
    {
      icon: <Building2 className="h-5 w-5 text-primary" />,
      title: "Department",
      value: job.department,
    },
    {
      icon: <Clock3 className="h-5 w-5 text-primary" />,
      title: "Employment",
      value: job.employmentType,
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Job Overview</h2>

        <p className="mt-1 text-muted-foreground">
          Everything you need to know before applying.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {overviewItems.map((item) => (
          <Card
            key={item.title}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="flex items-start gap-4 p-5">
              <div className="rounded-xl bg-primary/10 p-3">{item.icon}</div>

              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <h3 className="mt-1 font-semibold">{item.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
