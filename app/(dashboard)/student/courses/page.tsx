"use client";

import { useEffect, useState } from "react";
import { getEnrollments, Enrollment } from "@/lib/enrollment";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Enrollment[]>([]);


//   useEffect(() => {
//     setCourses(getEnrollments());
//   }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <p className="text-muted-foreground">No courses enrolled yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.courseId}>
              <CardContent className="p-4 space-y-2">
                <h2 className="font-semibold">{course.courseTitle}</h2>
                <Badge>{course.price}</Badge>
                <p className="text-sm text-muted-foreground">
                  Enrolled on {new Date(course.enrolledAt).toDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
