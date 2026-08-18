import { CareerJob } from "../lib/careers.types";
import CareersJobCard from "./CareersJobCard";

interface CareersJobGridProps {
  jobs: CareerJob[];
}

export default function CareersJobGrid({ jobs }: CareersJobGridProps) {
  return (
    <section>
      {/* <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Open Positions</h2>

          <p className="text-muted-foreground">
            {jobs.length} opportunity{jobs.length !== 1 ? "ies" : "y"} available
          </p>
        </div>
      </div> */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <CareersJobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}
