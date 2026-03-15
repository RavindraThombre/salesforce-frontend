export interface Enrollment {
  courseId: string;
  courseTitle: string;
  price: string;
  enrolledAt: string;
}

export function getEnrollments(): Enrollment[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("enrollments");
  return data ? JSON.parse(data) : [];
}

export function enrollCourse(course: Enrollment) {
  const existing = getEnrollments();
  localStorage.setItem(
    "enrollments",
    JSON.stringify([...existing, course])
  );
}

export function isCourseEnrolled(courseId: string): boolean {
  return getEnrollments().some((e) => e.courseId === courseId);
}
