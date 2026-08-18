"use client";

import { useMemo } from "react";
import { BriefcaseBusiness, Building2, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CareerJob, CareersFilter } from "../lib/careers.types";

interface CareersFiltersProps {
  jobs: CareerJob[];
  filter: CareersFilter;
  onChange: (filter: CareersFilter) => void;
}

export default function CareersFilters({
  jobs,
  filter,
  onChange,
}: CareersFiltersProps) {
  const departments = useMemo(
    () => [...new Set(jobs.map((job) => job.department))].sort(),
    [jobs],
  );

  const employmentTypes = useMemo(
    () => [...new Set(jobs.map((job) => job.employmentType))].sort(),
    [jobs],
  );

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={filter.search}
            onChange={(e) =>
              onChange({
                ...filter,
                search: e.target.value,
              })
            }
            placeholder="Search jobs..."
            className="h-11 pl-10"
          />
        </div>

        {/* Right Filters */}
        <div className="flex flex-col gap-3 md:flex-row lg:w-auto">
          <div className="relative min-w-[220px]">
            <Building2 className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Select
              value={filter.department}
              onValueChange={(value) =>
                onChange({
                  ...filter,
                  department: value,
                })
              }
            >
              <SelectTrigger className="h-11 pl-10">
                <SelectValue placeholder="Department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Departments</SelectItem>

                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative min-w-[220px]">
            <BriefcaseBusiness className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Select
              value={filter.employmentType}
              onValueChange={(value) =>
                onChange({
                  ...filter,
                  employmentType: value,
                })
              }
            >
              <SelectTrigger className="h-11 pl-10">
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Employment Types</SelectItem>

                {employmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
