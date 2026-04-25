"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Enrolled Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-muted-foreground">
          No courses enrolled yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course._id}
              href={`/student/courses/${course._id}`}
            >
              <Card className="cursor-pointer hover:shadow-lg transition">
                <CardContent className="p-4 space-y-2">
                  <h2 className="font-semibold text-lg">
                    {course.title}
                  </h2>

                  <Badge>₹ {course.price}</Badge>

                  <p className="text-sm text-muted-foreground">
                    Enrolled on{" "}
                    {new Date(course.enrolledAt).toDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}