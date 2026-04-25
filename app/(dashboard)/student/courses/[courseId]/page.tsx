"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseDetail, getCourseDetail } from "../lib/course";

export default function CourseLivePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [data, setData] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // 🔄 AUTO REFRESH TIME EVERY SECOND
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 📡 FETCH API
  useEffect(() => {
    if (!courseId) return;

    const fetch = async () => {
      try {
        const res = await getCourseDetail(courseId);
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [courseId]);

  // ⏳ FORMAT TIME
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);

    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    return `${h}h ${m}m ${s}s`;
  };

  // 🧠 LMS LOGIC FUNCTION
  const getClassStatus = (date: string) => {
    const CLASS_DURATION = 60 * 60 * 1000;
    const JOIN_BEFORE = 10 * 60 * 1000;

    const start = new Date(date).getTime();

    const isBeforeJoin = start - now > JOIN_BEFORE;

    const isJoinWindow =
      start - now <= JOIN_BEFORE && start - now > 0;

    const isLive =
      now >= start && now <= start + CLASS_DURATION;

    const isEnded = now > start + CLASS_DURATION;

    return {
      isBeforeJoin,
      isJoinWindow,
      isLive,
      isEnded,
      timeLeft: start - now,
    };
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">No data found</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        {data.title}
      </h1>

      {/* ================= LIVE CLASSES ================= */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Upcoming Live Classes
          </h2>

          {data.liveClasses.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No upcoming classes
            </p>
          )}

          {data.liveClasses.map((cls) => {
            const {
              isBeforeJoin,
              isJoinWindow,
              isLive,
              isEnded,
              timeLeft,
            } = getClassStatus(cls.date);

            return (
              <div
                key={cls._id}
                className="flex justify-between items-center border-b pb-3"
              >
                {/* LEFT */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{cls.topic}</p>

                    {isLive && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded animate-pulse">
                        LIVE NOW
                      </span>
                    )}

                    {isJoinWindow && !isLive && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                        JOINING SOON
                      </span>
                    )}

                    {isEnded && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                        ENDED
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {new Date(cls.date).toDateString()} | {cls.time}
                  </p>

                  {/* ⏳ COUNTDOWN */}
                  {(isBeforeJoin || isJoinWindow) && (
                    <p className="text-xs text-blue-600">
                      Starts in {formatTime(timeLeft)}
                    </p>
                  )}
                </div>

                {/* RIGHT BUTTON */}
                <Button
                  size="sm"
                  disabled={isBeforeJoin || isEnded}
                  className={`${
                    isLive
                      ? "bg-red-600 hover:bg-red-700"
                      : isJoinWindow
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : ""
                  }`}
                  onClick={() => {
                    if (cls.zoomLink) {
                      window.open(cls.zoomLink, "_blank");
                    }
                  }}
                >
                  {isEnded
                    ? "Ended"
                    : isBeforeJoin
                    ? "Not Started"
                    : isJoinWindow
                    ? "Join Soon"
                    : "Join Now"}
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ================= RECORDINGS ================= */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Past Classes
          </h2>

          {data.recordings.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No recordings available
            </p>
          )}

          {data.recordings.map((rec) => (
            <div
              key={rec._id}
              className="flex justify-between border-b pb-3"
            >
              <p>{rec.topic}</p>

              <Button
                variant="outline"
                onClick={() =>
                  window.open(rec.videoUrl, "_blank")
                }
              >
                Watch
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}