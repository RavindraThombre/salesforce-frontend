"use client";

import { BookOpen, ArrowRight, GraduationCap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Course = {
  _id: string;
  title: string;
};

type Props = {
  courses: Course[];
};

export default function StudentCoursesCard({ courses }: Props) {
  return (
    <Card className="overflow-hidden rounded-3xl border shadow-sm transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary/5 to-transparent px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold text-lg">Enrolled Courses</h2>

            <p className="text-sm text-muted-foreground">
              Courses assigned to this student
            </p>
          </div>
        </div>

        <Badge variant="secondary">
          {courses.length} Course{courses.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <CardContent className="p-6">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <GraduationCap className="mb-4 h-12 w-12 text-muted-foreground/40" />

            <h3 className="font-semibold">No Courses Found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              This student has not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div
                key={course._id}
                className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4 transition hover:bg-muted/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold">{course.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      Course ID: {course._id}
                    </p>
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
