"use client";

import { useEffect, useRef, useState } from "react";

import { useParams, notFound, useRouter } from "next/navigation";

import { checkEnrollment, getCourseById } from "../lib/publicCourses";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import CourseHero from "./components/CourseHero";

type Course = {
  _id: string;

  title: string;

  description: string;

  price: number;

  discountPrice?: number;

  originalPrice?: number | null;

  level?: string;

  duration?: string;

  syllabus?: string[];

  isFree?: boolean;

  totalLiveSessions?: number;

  averageRating?: number;

  totalReviews?: number;

  thumbnail?: string;

  status?: string;
};

export default function CourseDetailPage() {
  const router = useRouter();

  const params = useParams();

  const id = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);

  const [loading, setLoading] = useState(true);

  const [isEnrolled, setIsEnrolled] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!id || hasFetched.current) {
      return;
    }

    hasFetched.current = true;

    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);

        setCourse(data);

        const token = localStorage.getItem("token");

        if (token && token !== "undefined" && token !== "null") {
          const enrollment = await checkEnrollment(id);

          setIsEnrolled(enrollment.enrolled);
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);

        hasFetched.current = false;
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    if (!course) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
      toast.error("Please login to enroll");

      localStorage.setItem("redirectAfterLogin", `/courses/${course._id}`);

      router.push("/auth/login");

      return;
    }

    if (isEnrolled) {
      toast.info("You are already enrolled");

      return;
    }

    sessionStorage.setItem("selectedCourse", JSON.stringify(course));

    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <CourseHero
        course={course}
        isEnrolled={isEnrolled}
        onEnroll={handleEnroll}
      />

      {/* CTA */}

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Learning?
          </h2>

          <p className="mt-5 text-lg text-blue-100">
            Join live sessions, access learning resources, and start building
            your skills today.
          </p>

          <Button
            size="lg"
            onClick={handleEnroll}
            className="mt-8 bg-white text-blue-700 hover:bg-slate-100"
          >
            {isEnrolled ? "Already Enrolled" : "Enroll Now"}
          </Button>
        </div>
      </section>
    </main>
  );
}
