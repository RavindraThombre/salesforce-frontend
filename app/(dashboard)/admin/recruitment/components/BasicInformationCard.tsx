"use client";

import {
  Building2,
  BriefcaseBusiness,
  MapPin,
  UserRoundSearch,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { JobPositionFormValues } from "../lib/recruitment.type";

interface BasicInformationCardProps {
  form: JobPositionFormValues;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<JobPositionFormValues>>;
}

const employmentTypes = [
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
  "Remote",
  "Hybrid",
];

export default function BasicInformationCard({
  form,
  onChange,
  setForm,
}: BasicInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BriefcaseBusiness className="h-5 w-5 text-primary" />
          Basic Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Position */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Position Title
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <div className="relative">
              <UserRoundSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="title"
                name="title"
                placeholder="Senior React Developer"
                value={form.title}
                onChange={onChange}
                className="pl-10"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Name shown on the Careers page.
            </p>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">
              Department
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="department"
                name="department"
                placeholder="Engineering"
                value={form.department}
                onChange={onChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Employment Type */}
          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="employmentType">
              Employment Type
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <div className="relative">
              <BriefcaseBusiness className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Select
                value={form.employmentType}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    employmentType: value,
                  }))
                }
              >
                <SelectTrigger
                  id="employmentType"
                  className="h-12 w-full pl-10"
                >
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>

                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              Choose how this position will be offered.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Location
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="location"
                name="location"
                placeholder="Pune, Maharashtra"
                value={form.location}
                onChange={onChange}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
