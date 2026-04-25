"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourses } from "./lib/publicCourses";

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
    return (
      <div className="p-10 text-center">
        <p>Loading courses...</p>
      </div>
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
