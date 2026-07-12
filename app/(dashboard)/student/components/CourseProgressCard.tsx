"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy, TrendingUp } from "lucide-react";
import { CourseProgress } from "../lib/dashboardType";

type Props = {
  courseProgress: CourseProgress[];
};

export default function CourseProgressCard({ courseProgress }: Props) {
  return (
    <Card className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-500/10 p-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Course Progress</h2>

            <p className="text-sm text-muted-foreground">
              Track your learning journey
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {courseProgress.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">No Courses Yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Enroll in your first course to start tracking progress.
            </p>
          </div>
        )}

        {courseProgress.map((course, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-muted/30 p-5 transition-all hover:bg-muted/50"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold">{course.courseName}</h3>

                  <p className="text-xs text-muted-foreground">
                    Learning Progress
                  </p>
                </div>
              </div>

              {course.progress === 100 ? (
                <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                  <Trophy className="h-4 w-4" />
                  Completed
                </span>
              ) : (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {course.progress}%
                </span>
              )}
            </div>

            <Progress value={course.progress} className="h-3 rounded-full" />

            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>Started</span>

              <span>
                {course.progress === 100
                  ? "Completed"
                  : `${100 - course.progress}% Remaining`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
