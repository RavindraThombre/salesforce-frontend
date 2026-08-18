import { useEffect, useMemo, useState } from "react";

import { CareerJob, CareersFilter } from "../lib/careers.types";
import { getPublishedJobs } from "../lib/careers.service";

import CareersHero from "./CareersHero";
import { DEFAULT_CAREERS_FILTER } from "../lib/careers.constants";
import CareersFilters from "./CareersFilters";
import CareersJobGrid from "./CareersJobGrid";
import CareersLoading from "./CareersLoading";
import CareersEmptyState from "./CareersEmptyState";

export default function CareersPageLayout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [jobs, setJobs] = useState<CareerJob[]>([]);

  const [filter, setFilter] = useState<CareersFilter>(DEFAULT_CAREERS_FILTER);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPublishedJobs();

      setJobs(response);
    } catch (error) {
      console.error(error);
      setError("Unable to load career opportunities.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilter(DEFAULT_CAREERS_FILTER);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !filter.search ||
        job.title.toLowerCase().includes(filter.search.toLowerCase());

      const matchesDepartment =
        filter.department === "ALL" || job.department === filter.department;

      const matchesEmployment =
        filter.employmentType === "ALL" ||
        job.employmentType === filter.employmentType;

      return matchesSearch && matchesDepartment && matchesEmployment;
    });
  }, [jobs, filter]);

  return (
    <div className="min-h-screen bg-background">
      <CareersHero />

      <div className="container mx-auto space-y-8 px-4 py-10">
        <CareersFilters jobs={jobs} filter={filter} onChange={setFilter} />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredJobs.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{jobs.length}</span>{" "}
            opportunities
          </p>

          {(filter.search ||
            filter.department !== "ALL" ||
            filter.employmentType !== "ALL") && (
            <button
              onClick={handleResetFilters}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <CareersLoading />
        ) : error ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="font-medium text-destructive">{error}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <CareersEmptyState />
        ) : (
          <CareersJobGrid jobs={filteredJobs} />
        )}
      </div>
    </div>
  );
}
