"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import SalesforceLoader from "@/app/components/common/SalesforceLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Course, getMyCourses } from "./lib/course";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyCourses();
        setCourses(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) {
    return <SalesforceLoader />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              My Enrolled Courses
            </h1>

            <p className="mt-2 text-muted-foreground">
              Continue your Salesforce learning journey and track all your
              enrolled courses.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border bg-muted/40 px-5 py-4">
            <GraduationCap className="h-6 w-6 text-primary" />

            <div>
              <p className="text-xs text-muted-foreground">Total Courses</p>

              <p className="text-xl font-bold">{courses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <Card className="rounded-3xl border p-16 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <BookOpen className="mb-5 h-16 w-16 text-muted-foreground" />

            <h2 className="text-2xl font-semibold">No Courses Enrolled</h2>

            <p className="mt-2 max-w-md text-muted-foreground">
              Start your Salesforce learning journey by enrolling in your first
              course.
            </p>

            <Link href="/courses">
              <Button className="mt-6 rounded-xl">Browse Courses</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link key={course._id} href={`/student/courses/${course._id}`}>
              <Card className="group h-full overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Top */}
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                  <BookOpen className="h-16 w-16 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Body */}
                <div className="space-y-5 p-6">
                  <div>
                    <h2 className="line-clamp-2 text-xl font-semibold">
                      {course.title}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Salesforce Learning Program
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Student</Badge>

                    <Badge>₹{course.price}</Badge>
                  </div>

                  {/* Enrolled */}
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                    <CalendarDays className="h-5 w-5 text-primary" />

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Enrolled On
                      </p>

                      <p className="font-medium">
                        {new Date(course.enrolledAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <Button className="w-full rounded-xl">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
