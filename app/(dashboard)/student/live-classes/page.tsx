"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLiveClasses, LiveClass } from "./lib/liveClass";

export default function LiveClassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // 🔄 AUTO TIME UPDATE
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 📡 FETCH API
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLiveClasses();
        setClasses(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  // ⏳ FORMAT TIME
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);

    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    return `${h}h ${m}m ${s}s`;
  };

  // 🧠 LMS STATUS LOGIC
  const getStatus = (date: string) => {
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Live Classes</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((cls) => {
          const {
            isBeforeJoin,
            isJoinWindow,
            isLive,
            isEnded,
            timeLeft,
          } = getStatus(cls.date);

          return (
            <Card
              key={cls._id}
              className="hover:shadow-lg transition border"
            >
              <CardContent className="p-4 space-y-3">

                {/* TITLE */}
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    {cls.title}
                  </h3>

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

                {/* INSTRUCTOR */}
                <p className="text-sm text-gray-500">
                  Instructor: {cls.instructor}
                </p>

                {/* DATE */}
                <p className="text-sm">
                  📅 {new Date(cls.date).toDateString()} | ⏰ {cls.time}
                </p>

                {/* COUNTDOWN */}
                {(isBeforeJoin || isJoinWindow) && (
                  <p className="text-xs text-blue-600 font-medium">
                    Starts in {formatTime(timeLeft)}
                  </p>
                )}

                {/* BUTTON */}
                <Button
                  className={`w-full ${
                    isLive
                      ? "bg-red-600 hover:bg-red-700"
                      : isJoinWindow
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : ""
                  }`}
                  disabled={isBeforeJoin || isEnded}
                  onClick={() => {
                    if (cls.zoomLink && (isLive || isJoinWindow)) {
                      window.open(cls.zoomLink, "_blank");
                    }
                  }}
                >
                  {isEnded
                    ? "Class Ended"
                    : isBeforeJoin
                    ? "Not Started"
                    : isJoinWindow
                    ? "Join Soon"
                    : "Join Now"}
                </Button>

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}