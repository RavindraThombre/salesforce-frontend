"use client";

import { CircleDot } from "lucide-react";
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

interface CompensationCardProps {
  form: JobPositionFormValues;
  setForm: React.Dispatch<React.SetStateAction<JobPositionFormValues>>;
}

export default function CompensationCard({
  form,
  setForm,
}: CompensationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience & Compensation</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Min Experience */}
          <div className="space-y-2">
            <Label>Minimum Experience (Years)</Label>

            <Input
              type="number"
              min={0}
              value={form.experience.min}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  experience: {
                    ...prev.experience,
                    min: Number(e.target.value),
                  },
                }))
              }
            />
          </div>

          {/* Max Experience */}
          <div className="space-y-2">
            <Label>Maximum Experience (Years)</Label>

            <Input
              type="number"
              min={0}
              value={form.experience.max}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  experience: {
                    ...prev.experience,
                    max: Number(e.target.value),
                  },
                }))
              }
            />
          </div>

          {/* Min Salary */}
          <div className="space-y-2">
            <Label>Minimum Salary</Label>

            <Input
              type="number"
              min={0}
              value={form.salary.min}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  salary: {
                    ...prev.salary,
                    min: Number(e.target.value),
                  },
                }))
              }
            />
          </div>

          {/* Max Salary */}
          <div className="space-y-2">
            <Label>Maximum Salary</Label>

            <Input
              type="number"
              min={0}
              value={form.salary.max}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  salary: {
                    ...prev.salary,
                    max: Number(e.target.value),
                  },
                }))
              }
            />
          </div>

          {/* Openings */}
          <div className="space-y-2">
            <Label>Openings</Label>

            <Input
              type="number"
              min={1}
              value={form.openings}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  openings: Number(e.target.value),
                }))
              }
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">
              Status
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <div className="relative">
              <CircleDot className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Select
                value={form.status}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    status: value as "Draft" | "Published" | "Closed",
                  }))
                }
              >
                <SelectTrigger id="status" className="h-12 w-full pl-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              Select the current availability of this job position.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
