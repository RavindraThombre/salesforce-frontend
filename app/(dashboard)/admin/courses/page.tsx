"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";
import { CalendarDays, Star } from "lucide-react";

type Course = {
  _id: string;
  title: string;
  description: string;
  isFree: boolean;
  price: number;
  discountPrice?: number;
  totalLiveSessions: number;
  averageRating: number;
  totalReviews: number;
  thumbnail?: string;
};

const formatCurrency = (value: number) => value.toLocaleString("en-IN");

const getDiscountPercent = (price: number, discount?: number) => {
  if (!discount || discount >= price) return 0;
  return Math.round(((price - discount) / price) * 100);
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCourses();
  }, []);

  const deleteCourse = async (id: string) => {
    try {
      await apiClient.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>

        <Link href="/admin/courses/create">
          <Button className="cursor-pointer">Create Course</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium">No courses found</p>
          <p className="text-sm text-muted-foreground mb-4">
            Start by creating your first course
          </p>

          <Link href="/admin/courses/create">
            <Button>Create Course</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => {
            const discount = getDiscountPercent(
              course.price,
              course.discountPrice,
            );
            const isFree = course.price === 0;
            return (
              <Card
                key={course._id}
                className="overflow-hidden hover:shadow-lg transition"
              >
                {/* IMAGE */}
                {course.thumbnail && (
                  <div className="relative w-full h-40">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />

                    {/* DISCOUNT BADGE */}
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
                )}

                <CardContent className="p-4 space-y-2">
                  {/* TITLE */}
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {course.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center gap-2">
                    {isFree ? (
                      <span className="text-sm font-bold text-blue-600">
                        FREE
                      </span>
                    ) : course.discountPrice ? (
                      <>
                        <span className="text-lg font-bold text-green-600">
                          ₹{formatCurrency(course.discountPrice)}
                        </span>

                        <span className="text-sm line-through text-gray-400">
                          ₹{formatCurrency(course.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">
                        ₹{formatCurrency(course.price)}
                      </span>
                    )}
                  </div>

                  {/* COURSE DETAILS */}

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />

                      <span>
                        {course.totalLiveSessions} Live Session
                        {course.totalLiveSessions !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4" />

                      <span>
                        {course.averageRating > 0
                          ? course.averageRating.toFixed(1)
                          : "No rating"}

                        {course.totalReviews > 0 && ` (${course.totalReviews})`}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/courses/${course._id}/edit`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        Edit
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => deleteCourse(course._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
