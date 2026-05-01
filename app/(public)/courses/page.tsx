"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourses } from "./lib/publicCourses";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";

type Course = {
  _id: string;
  title: string;
  description: string;
  level: string;
  price: number;
  originalPrice?: number; // ✅ NEW
  image?: string;
};

const formatCurrency = (value: number) => value.toLocaleString("en-IN");

const getDiscountPercent = (price: number, original?: number) => {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
};

export default function CoursesPage() {
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
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Our Courses</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Explore our Salesforce courses designed for beginners and
          professionals.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => {
            const isFree = course.price === 0;
            const discount = getDiscountPercent(
              course.price,
              course.originalPrice,
            );

            return (
              <Card
                key={course._id}
                className="overflow-hidden hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="relative">
                  <Image
                    src={course.image || "/courses/admin.jpg"}
                    alt={course.title}
                    width={400}
                    height={250}
                    className="h-40 w-full object-cover"
                  />

                  {/* BADGE */}
                  {isFree ? (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      FREE
                    </span>
                  ) : (
                    discount > 0 && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        {discount}% OFF
                      </span>
                    )
                  )}
                </div>

                <CardContent className="p-4 space-y-2">
                  {/* TITLE */}
                  <h3 className="text-lg font-semibold">{course.title}</h3>

                  {/* DESC */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description}
                  </p>

                  {/* LEVEL */}
                  <span className="text-xs text-muted-foreground">
                    {course.level}
                  </span>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2">
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
                          <span className="text-sm line-through text-gray-400">
                            ₹{formatCurrency(course.originalPrice)}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4">
                  <Link href={`/courses/${course._id}`} className="w-full">
                    <Button className="w-full">
                      {isFree ? "Enroll Free" : "View Details"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
