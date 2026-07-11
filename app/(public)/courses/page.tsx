"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourses } from "./lib/publicCourses";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Course = {
  _id: string;
  title: string;
  description: string;
  level: string;
  price: number;
  originalPrice?: number;
  image?: string;
};

const formatCurrency = (value: number) => value.toLocaleString("en-IN");

const getDiscountPercent = (price: number, original?: number) => {
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
                <Card className="group overflow-hidden rounded-3xl border-border/40 bg-background/80 backdrop-blur-sm shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 h-full flex flex-col">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={course.image || "/courses/admin.jpg"}
                      alt={course.title}
                      width={400}
                      height={250}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* BADGE */}
                    {isFree ? (
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                        FREE
                      </span>
                    ) : (
                      discount > 0 && (
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                          {discount}% OFF
                        </span>
                      )
                    )}
                  </div>

                  <CardContent className="p-5 flex-1 space-y-3">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    <span className="inline-block text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {course.level}
                    </span>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 pt-2">
                      {isFree ? (
                        <span className="text-lg font-bold text-blue-600">
                          FREE
                        </span>
                      ) : (
                        <>
                          <span className="text-lg font-bold text-primary">
                            ₹{formatCurrency(course.price)}
                          </span>

                          {course.originalPrice && (
                            <span className="text-sm line-through text-muted-foreground">
                              ₹{formatCurrency(course.originalPrice)}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <Link href={`/courses/${course._id}`} className="w-full">
                      <Button className="w-full rounded-2xl group/btn">
                        {isFree ? "Enroll Free" : "View Details"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
