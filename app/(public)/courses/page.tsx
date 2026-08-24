"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourses } from "./lib/publicCourses";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Star } from "lucide-react";
import { useRouter } from "next/navigation";

type Course = {
  _id: string;
  title: string;
  description: string;
  level?: string;
  price: number;
  originalPrice?: number | null;
  image?: string;
  totalLiveSessions: number;
  averageRating?: number;
  totalReviews?: number;
};

const formatCurrency = (value: number) => value.toLocaleString("en-IN");

const getDiscountPercent = (price: number, original?: number | null) => {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
};

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <SalesforceLoader />;
  }

  if (!courses.length) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-6">
        {" "}
        <div className="text-center max-w-xl">
          {" "}
          <h2
            className="text-3xl sm:text-4xl font-extrabold"
            style={{
              color: "var(--wes-g-color-palette-blue-20, #032D60)",
              fontFamily:
                "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
            }}
          >
            {" "}
            No Courses Available{" "}
          </h2>{" "}
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            {" "}
            We’re currently updating our premium Salesforce programs. Please
            check back soon for new course launches.{" "}
          </p>{" "}
          <Link href="/">
            {" "}
            <Button className="mt-8 px-8 rounded-2xl">
              {" "}
              Back to Home{" "}
            </Button>{" "}
          </Link>{" "}
        </div>{" "}
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative py-4 md:py-6 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div>
                <h2
                  className="text-base sm:text-xl font-semibold tracking-tight capitalize"
                  style={{
                    fontFamily:
                      "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                  }}
                >
                  our courses
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Explore industry-leading Salesforce programs for beginners and
                  professionals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COURSES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => {
            const isFree = course.price === 0;
            const discount = getDiscountPercent(
              course.price,
              course.originalPrice,
            );

            return (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.55,
                }}
                viewport={{ once: true }}
              >
                <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={course.image || "/courses/admin.jpg"}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {(isFree || discount > 0) && (
                      <div className="absolute top-4 left-4">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-bold text-white shadow-lg ${
                            isFree
                              ? "bg-blue-600"
                              : "bg-gradient-to-r from-green-500 to-green-700"
                          }`}
                        >
                          {isFree ? "FREE" : `${discount}% OFF`}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="flex flex-1 flex-col p-6">
                    {/* CATEGORY */}
                    <span className="text-[14px] font-semibold uppercase tracking-wider text-primary">
                      {course.title}
                    </span>

                    {/* RATING */}
                    <div className="mt-2 flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                      {course.totalReviews && course.totalReviews > 0 ? (
                        <>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {(course.averageRating ?? 0).toFixed(1)}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            ({course.totalReviews}{" "}
                            {course.totalReviews === 1 ? "review" : "reviews"})
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No reviews yet
                        </span>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    <p className="mt-1 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {course.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      {course.level && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                          {course.level}
                        </span>
                      )}

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-4 w-4 text-primary" />

                        <span>
                          {course.totalLiveSessions}{" "}
                          {course.totalLiveSessions === 1
                            ? "Live Session"
                            : "Live Sessions"}
                        </span>
                      </div>
                    </div>

                    {/* INSTRUCTOR */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                          {course.title.charAt(0)}
                        </div>

                        <div>
                          <p className="text-xs font-semibold">
                            Blue Cloud Mentor
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Instructor
                          </p>
                        </div>
                      </div>

                      {!isFree && (
                        <div className="text-right gap-2">
                          <p className="text-sm font-bold text-primary">
                            ₹{formatCurrency(course.price)}
                          </p>

                          {course.originalPrice && (
                            <p className="text-[11px] text-muted-foreground line-through">
                              ₹{formatCurrency(course.originalPrice)}
                            </p>
                          )}
                        </div>
                      )}

                      {isFree && (
                        <p className="text-sm font-semibold text-blue-600">
                          FREE
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-4">
                    <Link href={`/courses/${course._id}`} className="w-full">
                      <Button className="w-full rounded-xl h-11">
                        {isFree ? "Enroll Now" : "View Details"}

                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
