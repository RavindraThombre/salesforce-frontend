"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CalendarDays,
  Clock,
  Edit,
  ExternalLink,
  Plus,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

import { apiClient } from "@/app/lib/axiosConfig";

import { deleteLiveClass, getLiveClasses } from "../api/liveClass.service";

import CreateLiveClassDialog from "./CreateLiveClassDialog";
import { Course, LiveClass, Trainer } from "../lib/liveClass.type";
import { formatDateTimeIST } from "../lib/getTimeParts";

const LiveClassesPageLayout = () => {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);
  const hasFetched = useRef(false);

  const fetchData = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const [coursesResponse, classesResponse, trainersResponse] =
        await Promise.all([
          apiClient.get("/courses"),
          getLiveClasses(),
          apiClient.get("/trainers"),
        ]);

      setCourses(coursesResponse.data);

      setClasses(classesResponse);

      setTrainers(trainersResponse.data);
    } catch (error) {
      console.error("Failed to load live classes:", error);

      toast.error("Failed to load live class data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchData(true);
  }, [fetchData]);

  const handleCreate = () => {
    setSelectedClass(null);
    setDialogOpen(true);
  };

  const handleEdit = (liveClass: LiveClass) => {
    setSelectedClass(liveClass);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLiveClass(id);

      setClasses((previous) => previous.filter((item) => item._id !== id));

      toast.success("Live class deleted successfully");
    } catch (error: unknown) {
      console.error(error);

      const message =
        typeof error === "object" && error !== null && "response" in error
          ? (
              error as {
                response?: {
                  data?: {
                    message?: string;
                  };
                };
              }
            ).response?.data?.message
          : undefined;

      toast.error(message || "Failed to delete live class");
    }
  };

  if (loading) {
    return <div className="p-6">Loading live classes...</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Classes</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Schedule and manage your live training sessions.
          </p>
        </div>

        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Class
        </Button>
      </div>

      {classes.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
            <CalendarDays className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">No live classes scheduled</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your first live class to get started.
            </p>

            <Button className="mt-5" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Class
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {classes.map((liveClass) => {
            const courseName =
              typeof liveClass.courseId === "string"
                ? "Course"
                : liveClass.courseId?.title;

            const trainerName =
              typeof liveClass.trainerId === "string"
                ? "Trainer"
                : liveClass.trainerId?.name;

            return (
              <Card
                key={liveClass._id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{courseName}</Badge>

                        <Badge
                          variant={liveClass.isFree ? "default" : "outline"}
                        >
                          {liveClass.isFree ? "Free" : "Paid"}
                        </Badge>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold">
                        {liveClass.topic}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />

                          {trainerName || "No trainer"}
                        </div>

                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />

                          {formatDateTimeIST(liveClass.startTime)}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {liveClass.durationMinutes} min
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {liveClass.zoomLink && (
                        <Button size="icon" variant="outline" asChild>
                          <a
                            href={liveClass.zoomLink}
                            target="_blank"
                            rel="noreferrer"
                            title="Open Zoom"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(liveClass)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(liveClass._id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <CreateLiveClassDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        courses={courses}
        trainers={trainers}
        editData={selectedClass}
        onSuccess={() => fetchData()}
      />
    </div>
  );
};

export default LiveClassesPageLayout;
