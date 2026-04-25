"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getTrainerClasses } from "./lib/tainersApi";

type LiveClass = {
  _id: string;
  topic: string;
  date: string;
  time: string;
  zoomLink: string;
  courseId: {
    title: string;
    level: string;
  };
};

export default function TrainerDashboard() {
  const [classes, setClasses] = useState<LiveClass[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTrainerClasses();
        setClasses(data);
      } catch {
        toast.error("Failed to load classes ❌");
      }
    };

    fetch();
  }, []);

  return (
  <div className="p-6 space-y-8">

    {/* ================= HEADER ================= */}
    <div>
      <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Overview of your classes and schedule
      </p>
    </div>

    {/* ================= STATS ================= */}
    {(() => {
      const now = new Date();

      const upcoming = classes.filter(
        (c) => new Date(c.date) > now
      );

      const past = classes.filter(
        (c) => new Date(c.date) <= now
      );

      return (
        <>
          <div className="grid gap-4 md:grid-cols-3">

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <h2 className="text-2xl font-bold">{classes.length}</h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <h2 className="text-2xl font-bold">{upcoming.length}</h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Completed</p>
                <h2 className="text-2xl font-bold">{past.length}</h2>
              </CardContent>
            </Card>

          </div>

          {/* ================= UPCOMING ================= */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming Classes</h2>

            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No upcoming classes
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((cls) => (
                  <Card key={cls._id} className="hover:shadow-md transition">
                    <CardContent className="p-5 space-y-3">

                      <h3 className="font-semibold">
                        {cls.courseId?.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {cls.topic}
                      </p>

                      <div className="text-sm text-muted-foreground">
                        📅 {new Date(cls.date).toLocaleDateString()}
                        <br />
                        ⏰ {cls.time}
                      </div>

                      <Badge>{cls.courseId?.level}</Badge>

                    </CardContent>

                    <CardFooter className="p-5 pt-0">
                      <Button
                        className="w-full"
                        onClick={() =>
                          window.open(cls.zoomLink, "_blank")
                        }
                      >
                        Start Class
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* ================= PAST ================= */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Recent Classes</h2>

            {past.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No past classes
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {past.slice(0, 3).map((cls) => (
                  <Card key={cls._id}>
                    <CardContent className="p-5 space-y-3">

                      <h3 className="font-semibold">
                        {cls.courseId?.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {cls.topic}
                      </p>

                      <div className="text-sm text-muted-foreground">
                        📅 {new Date(cls.date).toLocaleDateString()}
                        <br />
                        ⏰ {cls.time}
                      </div>

                      <Badge variant="secondary">Completed</Badge>

                    </CardContent>

                    <CardFooter className="p-5 pt-0">
                      <Button variant="secondary" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      );
    })()}
  </div>
);
}