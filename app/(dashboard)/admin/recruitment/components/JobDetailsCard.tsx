"use client";

import { ClipboardList, FileText, Gift, ListChecks } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { JobPositionFormValues } from "../lib/recruitment.type";

interface JobDetailsCardProps {
  form: JobPositionFormValues;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function JobDetailsCard({
  form,
  onChange,
}: JobDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>

        <CardDescription>
          Provide complete information about the position for applicants.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Job Description
            </Label>

            <Textarea
              id="description"
              name="description"
              rows={8}
              placeholder="Describe the role, team, and objectives..."
              value={form.description}
              onChange={onChange}
            />

            <p className="text-xs text-muted-foreground">
              Explain what the candidate will be working on.
            </p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <Label
              htmlFor="responsibilities"
              className="flex items-center gap-2"
            >
              <ClipboardList className="h-4 w-4 text-primary" />
              Responsibilities
            </Label>

            <Textarea
              id="responsibilities"
              name="responsibilities"
              rows={8}
              placeholder="• Build scalable applications&#10;• Review pull requests&#10;• Mentor developers"
              value={form.responsibilities}
              onChange={onChange}
            />

            <p className="text-xs text-muted-foreground">
              List the primary responsibilities for this role.
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              Requirements
            </Label>

            <Textarea
              id="requirements"
              name="requirements"
              rows={8}
              placeholder="• 3+ years React&#10;• TypeScript&#10;• Node.js"
              value={form.requirements}
              onChange={onChange}
            />

            <p className="text-xs text-muted-foreground">
              Mention qualifications, education, certifications, and experience.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <Label htmlFor="benefits" className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-primary" />
              Benefits
            </Label>

            <Textarea
              id="benefits"
              name="benefits"
              rows={8}
              placeholder="• Health Insurance&#10;• Flexible Working Hours&#10;• Annual Bonus"
              value={form.benefits}
              onChange={onChange}
            />

            <p className="text-xs text-muted-foreground">
              Highlight the perks offered to employees.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
