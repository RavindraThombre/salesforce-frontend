import { CareerJob } from "../../lib/careers.types";

import JobSection from "./JobSection";

interface JobDescriptionProps {
  job: CareerJob;
}

export default function JobDescription({ job }: JobDescriptionProps) {
  return (
    <div className="space-y-6">
      <JobSection title="Job Description" content={job.description} />

      <JobSection title="Responsibilities" content={job.responsibilities} />

      <JobSection title="Requirements" content={job.requirements} />

      <JobSection title="Benefits" content={job.benefits} />
    </div>
  );
}
