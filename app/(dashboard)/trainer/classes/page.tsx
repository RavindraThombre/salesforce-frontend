"use client";

import { useEffect, useState } from "react";
import { getTrainerClasses } from "../lib/tainersApi";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { toast } from "sonner";

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

export default function TrainerClassesPage() {
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

  const now = new Date();

  const upcoming = classes.filter(
    (c) => new Date(c.date) > now
  );

  const past = classes.filter(
    (c) => new Date(c.date) <= now
  );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">My Classes</h1>
        <p className="text-sm text-muted-foreground">
          View and manage your classes
        </p>
      </div>

      {/* TABS */}
      <Tabs defaultValue="upcoming">

        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({past.length})
          </TabsTrigger>
        </TabsList>

        {/* ================= UPCOMING ================= */}
        <TabsContent value="upcoming">
          {upcoming.length === 0 ? (
            <p className="text-muted-foreground mt-4">
              No upcoming classes
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {upcoming.map((cls) => (
                <Card key={cls._id} className="hover:shadow-md transition">
                  <CardContent className="p-5 space-y-3">

                    <h3 className="font-semibold text-lg">
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
        </TabsContent>

        {/* ================= PAST ================= */}
        <TabsContent value="past">
          {past.length === 0 ? (
            <p className="text-muted-foreground mt-4">
              No past classes
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {past.map((cls) => (
                <Card key={cls._id}>
                  <CardContent className="p-5 space-y-3">

                    <h3 className="font-semibold text-lg">
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
                    <Button
                      variant="secondary"
                      className="w-full"
                    >
                      View Recording
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}