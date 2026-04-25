"use client";

import { useEffect, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { checkEnrollment, getCourseById } from "../lib/publicCourses";
import { toast } from "sonner";

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  duration?: string;
  syllabus?: string[];
};

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
  if (!id) return;

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(id);
      setCourse(data);

      const token = localStorage.getItem("token");

      // ✅ only check if logged in
      if (token) {
        const res = await checkEnrollment(id);
        setIsEnrolled(res.enrolled);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchCourse();
}, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p>Loading course...</p>
      </div>
    );
  }

  if (!course) return notFound();

  return (
    <main className="bg-background text-foreground">

      {/* HEADER */}
      <section className="py-14 text-center border-b">
        <h1 className="text-4xl font-bold">{course.title}</h1>

        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {course.description}
        </p>

        <div className="flex justify-center gap-3 mt-4">
          <Badge>{course.level}</Badge>
          <Badge variant="secondary">
            {course.duration || "N/A"}
          </Badge>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        {/* SYLLABUS */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Course Syllabus
            </h2>

            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              {course.syllabus?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ENROLL */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Course Fee</h3>

            <p className="text-3xl font-bold text-primary">
              ₹{course.price}
            </p>

            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✔ Live Classes (Zoom)</li>
              <li>✔ Recorded Videos</li>
              <li>✔ Notes & Assignments</li>
              <li>✔ Certificate</li>
              <li>✔ Placement Guidance</li>
            </ul>

            {/* <Button className="w-full mt-4">
              Enroll Now
            </Button> */}
            
          <div className="space-y-3">

  {/* ✅ ENROLLED BADGE */}
  {isEnrolled && (
    <Badge className="bg-green-100 text-green-700">
      Enrolled
    </Badge>
  )}

  <Button
    className="w-full"
    disabled={isEnrolled}
    onClick={() => {
  if (!course) return;

  const token = localStorage.getItem("token");

  // 🔥 STRICT CHECK
  if (!token || token === "undefined" || token === "null") {
    toast.error("Please login to enroll");

    localStorage.setItem("redirectAfterLogin", "/checkout");

    router.push("/auth/login"); // ❌ REMOVE setTimeout
    return;
  }

  if (isEnrolled) {
    toast.info("You are already enrolled");
    return;
  }

  sessionStorage.setItem(
    "selectedCourse",
    JSON.stringify(course)
  );

  router.push("/checkout");
}}
  >
    {isEnrolled ? "Already Enrolled" : "Enroll Now"}
  </Button>

</div>
          </CardContent>
        </Card>

      </section>

      {/* CTA */}
      <section className="bg-muted py-14 text-center">
        <h2 className="text-3xl font-bold">
          Start Your Salesforce Journey
        </h2>

        <p className="mt-3 text-muted-foreground">
          Join thousands of students learning Salesforce with expert trainers.
        </p>

        <Button size="lg" className="mt-6">
          Join Now
        </Button>
      </section>

    </main>
  );
}