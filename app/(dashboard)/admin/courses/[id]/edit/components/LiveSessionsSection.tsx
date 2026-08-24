import { FormikProps } from "formik";
import { Layers, Video } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { EditCourseFormValues } from "../types/course.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LiveSessionsSectionProps {
  formik: FormikProps<EditCourseFormValues>;
  totalScheduledSessions: number;
}

export function LiveSessionsSection({
  formik,
  totalScheduledSessions,
}: LiveSessionsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Video className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">Course Configuration</h2>

            <p className="text-sm text-muted-foreground">
              Configure the course level and maximum number of live sessions.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* COURSE LEVEL */}

          <div className="space-y-2">
            <label
              htmlFor="level"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Layers className="h-4 w-4 text-primary" />
              Course Level
              <span className="text-destructive">*</span>
            </label>

            <Select
              value={formik.values.level}
              onValueChange={(value) => {
                formik.setFieldValue("level", value);
              }}
            >
              <SelectTrigger
                className={
                  formik.touched.level && formik.errors.level
                    ? "border-destructive"
                    : ""
                }
              >
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>

                <SelectItem value="Intermediate">Intermediate</SelectItem>

                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {formik.touched.level && formik.errors.level && (
              <p className="text-sm text-destructive">{formik.errors.level}</p>
            )}
          </div>

          {/* TOTAL LIVE SESSIONS */}

          <div className="space-y-2">
            <label htmlFor="totalLiveSessions" className="text-sm font-medium">
              Total Live Sessions
              <span className="ml-1 text-destructive">*</span>
            </label>

            <Input
              id="totalLiveSessions"
              name="totalLiveSessions"
              type="number"
              min={Math.max(totalScheduledSessions, 1)}
              step={1}
              placeholder="e.g. 30"
              value={formik.values.totalLiveSessions || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.totalLiveSessions &&
                formik.errors.totalLiveSessions
                  ? "border-destructive"
                  : ""
              }
            />

            {formik.touched.totalLiveSessions &&
              formik.errors.totalLiveSessions && (
                <p className="text-sm text-destructive">
                  {formik.errors.totalLiveSessions}
                </p>
              )}

            {totalScheduledSessions > 0 && (
              <p className="text-xs text-muted-foreground">
                {totalScheduledSessions} live session
                {totalScheduledSessions === 1 ? " is" : "s are"} already
                scheduled. The total cannot be reduced below this number.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
