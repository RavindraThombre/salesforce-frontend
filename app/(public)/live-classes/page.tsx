"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ExternalLink,
  Radio,
  Timer,
  UserRound,
  Video,
} from "lucide-react";
import { toast } from "sonner";

import { useUser } from "@/app/context/UserContext";
import { apiClient } from "@/app/lib/axiosConfig";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatDateTimeIST,
  formatTime,
} from "@/app/(dashboard)/admin/live-classes/lib/getTimeParts";

type LiveClass = {
  _id: string;
  course?: string;
  trainer?: string;
  courseId?:
    | string
    | {
        _id: string;
        title: string;
      };

  trainerId?: {
    name: string;
  };

  topic?: string;
  date: string;
  time: string;
  level: string;
  zoomLink: string;

  isFree: boolean;

  isLive: boolean;
  isUpcoming: boolean;

  startTime: string;
  endTime: string;
};

type ClassStatus = "LIVE" | "UPCOMING" | "ENDED";

const getClassStatus = (cls: LiveClass, currentTime: number): ClassStatus => {
  const start = new Date(cls.startTime).getTime();
  const end = new Date(cls.endTime).getTime();

  if (currentTime < start) {
    return "UPCOMING";
  }

  if (currentTime >= start && currentTime < end) {
    return "LIVE";
  }

  return "ENDED";
};

const getCountdown = (startTime: string, currentTime: number) => {
  const start = new Date(startTime).getTime();
  const diff = start - currentTime;

  if (diff <= 0) {
    return null;
  }

  const totalSeconds = Math.ceil(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

export default function LiveClassesPage() {
  const { user } = useUser();

  const router = useRouter();

  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);

  // Used to automatically update Live/Upcoming/Ended
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  /**
   * Fetch Classes
   */
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);

      try {
        const res = await apiClient.get("/public/live-classes");

        setLiveClasses(res.data);
      } catch (err) {
        console.error(err);

        toast.error("Failed to load live classes");
      } finally {
        setLoading(false);
      }
    };

    void fetchClasses();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1_000);

    return () => clearInterval(interval);
  }, []);

  const sortedClasses = useMemo(() => {
    const priority: Record<ClassStatus, number> = {
      LIVE: 1,
      UPCOMING: 2,
      ENDED: 3,
    };

    return [...liveClasses].sort((a, b) => {
      const statusA = getClassStatus(a, currentTime);

      const statusB = getClassStatus(b, currentTime);

      return priority[statusA] - priority[statusB];
    });
  }, [liveClasses, currentTime]);

  const handleJoin = (cls: LiveClass) => {
    const status = getClassStatus(cls, Date.now());

    if (status === "UPCOMING") {
      toast.error("Class has not started yet");

      return;
    }

    if (status === "ENDED") {
      toast.error("This class has already ended");

      return;
    }

    if (!user) {
      router.push("/auth/login");

      return;
    }

    // FREE CLASS
    if (cls.isFree) {
      window.open(cls.zoomLink, "_blank", "noopener,noreferrer");

      return;
    }

    const courseId =
      typeof cls.courseId === "string" ? cls.courseId : cls.courseId?._id;

    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]",
    );

    const isEnrolled = enrolledCourses.includes(courseId);

    if (isEnrolled) {
      window.open(cls.zoomLink, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/courses/${courseId}`);
    }
  };

  if (loading) {
    return <SalesforceLoader />;
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* ================= HEADER ================= */}

      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                    Live Classes
                  </h1>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Join instructor-led Salesforce sessions and learn directly
                    from industry experts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLASSES ================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {sortedClasses.length === 0 ? (
          <Card className="border-dashed shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <CalendarDays className="h-6 w-6 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No live classes scheduled</h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                New Salesforce live training sessions will appear here when they
                are scheduled.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedClasses.map((cls) => {
              const status = getClassStatus(cls, currentTime);

              const countdown =
                status === "UPCOMING"
                  ? getCountdown(cls.startTime, currentTime)
                  : null;

              return (
                <Card
                  key={cls._id}
                  className="group overflow-hidden border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* STATUS BAR */}

                  {status === "LIVE" && (
                    <div className="flex items-center justify-center gap-2 bg-red-600 px-4 py-2 text-xs font-semibold text-white">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      LIVE NOW
                    </div>
                  )}

                  <CardContent className="p-6">
                    {/* HEADER */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
                          {cls.course ||
                            (typeof cls.courseId !== "string" &&
                              cls.courseId?.title)}
                        </h3>

                        {cls.topic && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {cls.topic}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {/* CLASS STATUS */}
                        {status === "LIVE" && (
                          <Badge className="gap-1.5 bg-red-600 text-white hover:bg-red-600">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            Live
                          </Badge>
                        )}

                        {status === "UPCOMING" && (
                          <Badge variant="secondary">Upcoming</Badge>
                        )}

                        {status === "ENDED" && (
                          <Badge variant="outline">Ended</Badge>
                        )}

                        {/* PAYMENT STATUS */}
                        <Badge
                          variant="outline"
                          className={
                            cls.isFree
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-slate-200 bg-slate-50 text-slate-700"
                          }
                        >
                          {cls.isFree ? "Free" : "Paid"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 border-t pt-4">
                      {/* TRAINER */}
                      <div className="flex items-center gap-3 text-sm">
                        <UserRound className="h-4 w-4 text-muted-foreground" />

                        <span className="text-muted-foreground">Trainer</span>

                        <span className="ml-auto font-medium">
                          {cls.trainer || cls.trainerId?.name}
                        </span>
                      </div>

                      {/* DATE */}
                      <div className="flex items-center gap-3 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />

                        <span className="text-muted-foreground">Date</span>

                        <span className="ml-auto font-medium">
                          {new Date(cls.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* SCHEDULED TIME */}
                      <div className="flex items-center gap-3 text-sm">
                        <Clock3 className="h-4 w-4 text-muted-foreground" />

                        <span className="text-muted-foreground">Time</span>

                        <span className="ml-auto font-medium">
                          {formatTime(cls.time)} IST
                        </span>
                      </div>

                      {/* START TIME */}
                      <div className="flex items-center gap-3 text-sm">
                        <Clock3 className="h-4 w-4 text-muted-foreground" />

                        <span className="text-muted-foreground">Starts At</span>

                        <span className="ml-auto text-right font-medium">
                          {formatDateTimeIST(cls.startTime)}
                        </span>
                      </div>

                      {/* END TIME */}
                      <div className="flex items-center gap-3 text-sm">
                        <Clock3 className="h-4 w-4 text-muted-foreground" />

                        <span className="text-muted-foreground">Ends At</span>

                        <span className="ml-auto text-right font-medium">
                          {formatDateTimeIST(cls.endTime)}
                        </span>
                      </div>
                    </div>

                    {/* COUNTDOWN */}

                    {status === "UPCOMING" && countdown && (
                      <div className="mt-5 flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3">
                        <Timer className="h-4 w-4 text-primary" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Class starts in
                          </p>

                          <p className="text-sm font-semibold">{countdown}</p>
                        </div>
                      </div>
                    )}

                    {/* LIVE */}

                    {status === "LIVE" && (
                      <div className="mt-5 flex items-center gap-3 rounded-lg bg-red-50 px-4 py-3 text-red-700">
                        <Radio className="h-4 w-4 animate-pulse" />

                        <p className="text-sm font-medium">Class is live now</p>
                      </div>
                    )}

                    {/* ACTION */}

                    <Button
                      className="mt-5 w-full"
                      variant={status === "LIVE" ? "default" : "secondary"}
                      disabled={status !== "LIVE"}
                      onClick={() => handleJoin(cls)}
                    >
                      {status === "LIVE" ? (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Join Class
                        </>
                      ) : status === "UPCOMING" ? (
                        <>
                          <Clock3 className="mr-2 h-4 w-4" />
                          Starts Soon
                        </>
                      ) : (
                        "Class Ended"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= INFO ================= */}

      <section className="border-t bg-white py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Don&apos;t Miss a Class
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Enroll in a Salesforce course to receive meeting links, class
            reminders, and access to live instructor-led sessions.
          </p>

          <Button size="lg" className="mt-6 rounded-xl px-8" asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
