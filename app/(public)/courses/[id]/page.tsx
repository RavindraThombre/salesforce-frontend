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
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        {/* Background Blur */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            {/* LEFT */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-5">
                <Badge className="bg-blue-600 hover:bg-blue-600">
                  {course.level}
                </Badge>

                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white border-0"
                >
                  {course.duration || "N/A"}
                </Badge>

                <Badge
                  variant="secondary"
                  className="bg-green-600 text-white border-0"
                >
                  Bestseller
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {course.title}
              </h1>

              <p className="mt-6 text-lg text-slate-300 max-w-3xl leading-8">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <p className="text-3xl font-bold">₹{course.price}</p>
                  <p className="text-slate-400 text-sm">One-time Payment</p>
                </div>

                <div>
                  <p className="text-3xl font-bold">
                    {course.duration || "N/A"}
                  </p>
                  <p className="text-slate-400 text-sm">Course Duration</p>
                </div>

                <div>
                  <p className="text-3xl font-bold">Live</p>
                  <p className="text-slate-400 text-sm">Online Classes</p>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <Card className="shadow-2xl border-0 bg-white text-black">
              <CardContent className="p-7">
                <p className="text-4xl font-bold text-primary">
                  ₹{course.price}
                </p>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between text-sm">
                    <span>Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Duration</span>
                    <span className="font-medium">
                      {course.duration || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Mode</span>
                    <span className="font-medium">Live + Recorded</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Certificate</span>
                    <span className="font-medium">Included</span>
                  </div>
                </div>

                {isEnrolled && (
                  <Badge className="mt-6 bg-green-100 text-green-700">
                    Already Enrolled
                  </Badge>
                )}

                <Button
                  className="w-full mt-6 h-12 text-base"
                  disabled={isEnrolled}
                  onClick={() => {
                    if (!course) return;

                    const token = localStorage.getItem("token");

                    if (!token || token === "undefined" || token === "null") {
                      toast.error("Please login to enroll");
                      localStorage.setItem("redirectAfterLogin", "/checkout");
                      router.push("/auth/login");
                      return;
                    }

                    if (isEnrolled) {
                      toast.info("You are already enrolled");
                      return;
                    }

                    sessionStorage.setItem(
                      "selectedCourse",
                      JSON.stringify(course),
                    );

                    router.push("/checkout");
                  }}
                >
                  {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold">
            Ready to Become a Salesforce Professional?
          </h2>

          <p className="mt-5 text-lg text-blue-100">
            Learn from industry experts, build real-world projects, earn
            certification, and prepare for high-paying Salesforce careers.
          </p>

          <Button
            size="lg"
            className="mt-8 bg-white text-blue-700 hover:bg-slate-100"
          >
            Start Learning Today
          </Button>
        </div>
      </section>
    </main>
  );
}
