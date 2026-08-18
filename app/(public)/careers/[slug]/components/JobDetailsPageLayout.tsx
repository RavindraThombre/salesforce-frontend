"use client";

import { useEffect, useState } from "react";

import { CareerJob } from "../../lib/careers.types";
import { getPublishedJobBySlug } from "../../lib/careers.service";

import CareersLoading from "../../components/CareersLoading";

import JobHeader from "./JobHeader";
import JobOverview from "./JobOverview";
import JobDescription from "./JobDescription";
import JobSidebar from "./JobSidebar";

interface JobDetailsPageLayoutProps {
  id: string;
}

export default function JobDetailsPageLayout({
  id,
}: JobDetailsPageLayoutProps) {
  const [loading, setLoading] = useState(true);

  const [job, setJob] = useState<CareerJob | null>(null);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError("");

      // id currently contains the slug
      const response = await getPublishedJobBySlug(id);

      setJob(response);
    } catch (error) {
      console.error(error);

      setError("Job position not found.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CareersLoading />;
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Job Not Found</h2>

        <p className="mt-3 text-muted-foreground">
          The requested job could not be found or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <JobHeader job={job} />

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <JobOverview job={job} />

            <JobDescription job={job} />
          </div>

          <JobSidebar job={job} />
        </div>
      </div>
    </div>
  );
}
