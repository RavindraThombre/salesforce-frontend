"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { apiClient } from "@/app/lib/axiosConfig";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

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

  date: string;
  time: string;
  level: string;
  zoomLink: string;

  isFree: boolean;

  isLive: boolean;
  isUpcoming: boolean;
  startTime: string;
};

export default function LiveClassesPage() {
  const { user } = useUser();
  const router = useRouter();
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await apiClient.get("/public/live-classes"); // 👈 your API
        setLiveClasses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleJoin = (cls: LiveClass) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!cls.isLive) {
      toast.error("Class not started yet");
      return;
    }

    // ✅ FREE CLASS
    if (cls.isFree) {
      window.open(cls.zoomLink, "_blank");
      return;
    }

    // ✅ FIX courseId extraction
    const courseId =
      typeof cls.courseId === "string" ? cls.courseId : cls.courseId?._id;

    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]",
    );

    const isEnrolled = enrolledCourses.includes(courseId);

    if (isEnrolled) {
      window.open(cls.zoomLink, "_blank");
    } else {
      router.push(`/courses/${courseId}`);
    }
  };

  const getCountdown = (startTime: string) => {
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();

    const diff = start - now;

    if (diff <= 0) return null;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    return hours > 0 ? `${hours}h ${minutes % 60}m left` : `${minutes}m left`;
  };

  if (loading) {
    return <p className="text-center py-20">Loading classes...</p>;
  }
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="relative py-4 md:py-6 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div>
              <h2
                className="text-base sm:text-xl font-semibold tracking-tight capitalize"
                style={{
                  fontFamily:
                    "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                }}
              >
                Live Classes Schedule
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Join our instructor-led Salesforce classes live on Zoom and
                learn from industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CLASS LIST */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveClasses.map((cls) => (
            <Card key={cls._id} className="hover:shadow-lg transition">
              <CardContent className="p-6 space-y-3">
                {/* TITLE + BADGE */}

                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    {cls.course ||
                      (typeof cls.courseId !== "string" && cls.courseId?.title)}
                  </h3>

                  <div className="flex gap-2">
                    {/* 🔴 LIVE */}
                    {cls.isLive && (
                      <Badge className="bg-red-600 text-white animate-pulse">
                        LIVE 🔴
                      </Badge>
                    )}

                    {/* ⏳ UPCOMING */}
                    {!cls.isLive && cls.isUpcoming && (
                      <Badge variant="secondary">Upcoming</Badge>
                    )}

                    {/* 💰 FREE / PAID */}
                    <Badge variant={cls.isFree ? "default" : "destructive"}>
                      {cls.isFree ? "Free" : "Paid"}
                    </Badge>
                  </div>
                </div>

                {/* TRAINER */}
                <p className="text-sm text-muted-foreground">
                  Trainer:{" "}
                  <span className="font-medium">
                    {cls.trainer || cls.trainerId?.name}
                  </span>
                </p>

                {/* DETAILS */}
                <div className="flex flex-wrap gap-2">
                  <Badge>{cls.level}</Badge>

                  <Badge variant="secondary">
                    {new Date(cls.date).toLocaleDateString("en-IN")}
                  </Badge>

                  <Badge variant="outline">{cls.time}</Badge>
                </div>

                {cls.isUpcoming && (
                  <p className="text-sm text-muted-foreground">
                    Starts in: {getCountdown(cls.startTime)}
                  </p>
                )}
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full"
                  disabled={!cls.isLive && !cls.isUpcoming}
                  onClick={() => handleJoin(cls)}
                >
                  {cls.isLive
                    ? "Join Now"
                    : cls.isUpcoming
                      ? "Starts Soon"
                      : "Expired"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* INFO */}
      <section className="bg-muted/40 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold"
            style={{
              fontFamily:
                "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
            }}
          >
            Don’t Miss a Class
          </h2>

          <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            Enroll in a Salesforce course to receive Zoom meeting links, class
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
