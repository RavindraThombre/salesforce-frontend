import Image from "next/image";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Course = {
  _id: string;
  title: string;
  description: string;

  price: number;
  discountPrice?: number;

  originalPrice?: number | null;

  level?: string;

  duration?: string;

  totalLiveSessions?: number;

  averageRating?: number;

  totalReviews?: number;

  thumbnail?: string;

  isFree?: boolean;
};

interface CourseHeroProps {
  course: Course;

  isEnrolled: boolean;

  onEnroll: () => void;
}

const formatCurrency = (value: number) => value.toLocaleString("en-IN");

const getDiscountPercent = (price: number, original?: number | null) => {
  if (!original || original <= price) {
    return 0;
  }

  return Math.round(((original - price) / original) * 100);
};

export default function CourseHero({
  course,
  isEnrolled,
  onEnroll,
}: CourseHeroProps) {
  const discount = getDiscountPercent(course.price, course.originalPrice);

  const isFree = course.isFree || course.price === 0;

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_420px]">
          {/* LEFT SIDE */}

          <div>
            {/* BADGES */}

            <div className="flex flex-wrap items-center gap-3">
              {course.level && (
                <Badge className="border-0 bg-blue-600 px-4 py-1.5 text-sm">
                  {course.level}
                </Badge>
              )}

              {discount > 0 && (
                <Badge className="border-0 bg-green-600 px-4 py-1.5 text-sm">
                  {discount}% OFF
                </Badge>
              )}

              {isFree && (
                <Badge className="border-0 bg-green-600 px-4 py-1.5 text-sm">
                  FREE
                </Badge>
              )}
            </div>

            {/* TITLE */}

            <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {course.title}
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {course.description}
            </p>

            {/* RATING */}

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                {course.totalReviews && course.totalReviews > 0 ? (
                  <>
                    <span className="font-semibold">
                      {(course.averageRating || 0).toFixed(1)}
                    </span>

                    <span className="text-sm text-slate-400">
                      ({course.totalReviews}{" "}
                      {course.totalReviews === 1 ? "review" : "reviews"})
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-slate-400">No reviews yet</span>
                )}
              </div>

              <div className="h-5 w-px bg-white/20" />

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CalendarDays className="h-4 w-4 text-blue-400" />

                <span>
                  {course.totalLiveSessions || 0}{" "}
                  {(course.totalLiveSessions || 0) === 1
                    ? "Live Session"
                    : "Live Sessions"}
                </span>
              </div>
            </div>

            {/* COURSE STATS */}

            <div className="mt-10 grid max-w-2xl gap-5 sm:grid-cols-3">
              {/* PRICE */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-slate-400">
                  <IndianRupee className="h-4 w-4" />

                  <span className="text-sm">Course Price</span>
                </div>

                <div className="mt-3">
                  {isFree ? (
                    <p className="text-2xl font-bold text-green-400">FREE</p>
                  ) : (
                    <>
                      <p className="text-2xl font-bold">
                        ₹{formatCurrency(course.price)}
                      </p>

                      {course.originalPrice &&
                        course.originalPrice > course.price && (
                          <p className="mt-1 text-sm text-slate-500 line-through">
                            ₹{formatCurrency(course.originalPrice)}
                          </p>
                        )}
                    </>
                  )}
                </div>
              </div>

              {/* LIVE SESSIONS */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="h-4 w-4" />

                  <span className="text-sm">Sessions</span>
                </div>

                <p className="mt-3 text-2xl font-bold">
                  {course.totalLiveSessions || 0}
                </p>

                <p className="mt-1 text-sm text-slate-400">Live Classes</p>
              </div>

              {/* MODE */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-slate-400">
                  <PlayCircle className="h-4 w-4" />

                  <span className="text-sm">Learning Mode</span>
                </div>

                <p className="mt-3 text-xl font-bold">Live</p>

                <p className="mt-1 text-sm text-slate-400">Online Classes</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE COURSE CARD */}

          <div className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
              {/* IMAGE */}

              <div className="relative aspect-video w-full bg-slate-100">
                <Image
                  src={course.thumbnail || "/courses/admin.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />

                {discount > 0 && (
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-green-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      {discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* CONTENT */}

              <div className="p-6">
                {/* PRICE */}

                <div className="flex items-end gap-3">
                  {isFree ? (
                    <p className="text-4xl font-bold text-green-600">FREE</p>
                  ) : (
                    <>
                      <p className="text-4xl font-bold">
                        ₹{formatCurrency(course.price)}
                      </p>

                      {course.originalPrice &&
                        course.originalPrice > course.price && (
                          <p className="mb-1 text-sm text-slate-400 line-through">
                            ₹{formatCurrency(course.originalPrice)}
                          </p>
                        )}
                    </>
                  )}
                </div>

                {/* DETAILS */}

                <div className="mt-7 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-slate-500">Level</span>

                    <span className="font-medium">{course.level || "N/A"}</span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-slate-500">
                      Live Sessions
                    </span>

                    <span className="font-medium">
                      {course.totalLiveSessions || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-slate-500">Mode</span>

                    <span className="font-medium">Live + Recorded</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Certificate</span>

                    <span className="flex items-center gap-1 font-medium text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Included
                    </span>
                  </div>
                </div>

                {isEnrolled && (
                  <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700">
                    You are already enrolled
                  </div>
                )}

                <Button
                  onClick={onEnroll}
                  disabled={isEnrolled}
                  className="mt-6 h-13 w-full rounded-xl text-base"
                >
                  {isEnrolled
                    ? "Already Enrolled"
                    : isFree
                      ? "Enroll Free"
                      : "Enroll Now"}
                </Button>

                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                  <Clock3 className="h-3.5 w-3.5" />
                  Start learning immediately after enrollment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
