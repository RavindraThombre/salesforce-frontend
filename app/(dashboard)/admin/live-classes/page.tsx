"use client";

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  CalendarIcon,
  Clock,
  ExternalLink,
  GraduationCap,
  Link2,
  Loader2,
  Plus,
  Trash2,
  UserRound,
  Video,
} from "lucide-react";
import { toast } from "sonner";

import { apiClient } from "@/app/lib/axiosConfig";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  convertTo24Hour,
  formatDateTimeIST,
  formatTime,
  getTimeParts,
} from "./lib/getTimeParts";
import { Course, initialForm, LiveClass, Trainer } from "./lib/liveClass.type";

export default function LiveClassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);

  const hasFetched = useRef(false);

  const fetchData = async () => {
    try {
      const [coursesRes, classesRes, trainersRes] = await Promise.all([
        apiClient.get("/courses"),
        apiClient.get("/admin/live-classes", {
          headers: {
            "Cache-Control": "no-cache",
          },
        }),
        apiClient.get("/trainers"),
      ]);

      setCourses(coursesRes.data);
      setClasses(classesRes.data);
      setTrainers(trainersRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load live class data");
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    if (
      !form.courseId ||
      !form.trainerId ||
      !form.topic.trim() ||
      !form.date ||
      !form.time ||
      !form.durationMinutes
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await apiClient.post("/admin/live-classes", {
        ...form,
        durationMinutes: Number(form.durationMinutes),
      });

      toast.success("Live class scheduled successfully");

      setForm(initialForm);

      await fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to schedule class");
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async (id: string) => {
    try {
      setDeletingId(id);

      await apiClient.delete(`/admin/live-classes/${id}`);

      setClasses((prev) => prev.filter((item) => item._id !== id));

      toast.success("Class deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete class");
    } finally {
      setDeletingId(null);
    }
  };

  const isFormValid =
    form.courseId &&
    form.trainerId &&
    form.topic.trim() &&
    form.date &&
    form.time &&
    form.durationMinutes;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-2">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Video className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Live Classes
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Schedule and manage live training sessions for your courses.
              </p>
            </div>
          </div>
        </div>

        {/* ================= CREATE CLASS ================= */}
        <Card className="overflow-hidden border-slate-200 shadow-sm">
          <div className="border-b bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Plus className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="text-md font-semibold text-slate-900">
                  Schedule New Class
                </h2>

                <p className="text-sm text-muted-foreground">
                  Select a course, assign a trainer, and configure the session.
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* COURSE */}
              <div className="space-y-2">
                <Label>
                  Course
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Select
                  value={form.courseId}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      courseId: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-11 w-full bg-white">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>

                  <SelectContent className="z-[9999]">
                    {courses.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* TRAINER */}
              <div className="space-y-2">
                <Label>
                  Trainer
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Select
                  value={form.trainerId}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      trainerId: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-11 w-full bg-white">
                    <SelectValue placeholder="Select a trainer" />
                  </SelectTrigger>

                  <SelectContent className="z-[9999]">
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer._id} value={trainer._id}>
                        {trainer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* TOPIC */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="topic">
                  Class Topic
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Input
                  id="topic"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  placeholder="e.g. Introduction to Salesforce Apex"
                  className="h-11 bg-white"
                />
              </div>

              {/* DATE */}
              <div className="space-y-2">
                <Label>
                  Class Date
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-11 w-full justify-start bg-white text-left font-normal ${
                        !form.date ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {form.date
                        ? format(new Date(form.date), "PPP")
                        : "Select class date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form.date ? new Date(form.date) : undefined}
                      onSelect={(selectedDate) => {
                        setForm((prev) => ({
                          ...prev,
                          date: selectedDate ? selectedDate.toISOString() : "",
                        }));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>
                  Class Time
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <div className="flex items-center gap-2">
                  {/* HOUR */}
                  <div className="relative flex-1">
                    <Clock className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Select
                      value={getTimeParts(form.time).hour}
                      onValueChange={(hour) => {
                        const current = getTimeParts(form.time);

                        setForm((prev) => ({
                          ...prev,
                          time: convertTo24Hour(
                            hour,
                            current.minute || "00",
                            current.period,
                          ),
                        }));
                      }}
                    >
                      <SelectTrigger className="h-11 w-full bg-white pl-10">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>

                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (hour) => (
                            <SelectItem key={hour} value={String(hour)}>
                              {String(hour).padStart(2, "0")}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <span className="font-medium">:</span>

                  {/* MINUTE */}
                  <Select
                    value={getTimeParts(form.time).minute}
                    onValueChange={(minute) => {
                      const current = getTimeParts(form.time);

                      setForm((prev) => ({
                        ...prev,
                        time: convertTo24Hour(
                          current.hour || "12",
                          minute,
                          current.period,
                        ),
                      }));
                    }}
                  >
                    <SelectTrigger className="h-11 flex-1 bg-white">
                      <SelectValue placeholder="Minute" />
                    </SelectTrigger>

                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => {
                        const minute = String(i).padStart(2, "0");

                        return (
                          <SelectItem key={minute} value={minute}>
                            {minute}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  {/* AM / PM */}
                  <Select
                    value={getTimeParts(form.time).period}
                    onValueChange={(period) => {
                      const current = getTimeParts(form.time);

                      setForm((prev) => ({
                        ...prev,
                        time: convertTo24Hour(
                          current.hour || "12",
                          current.minute || "00",
                          period,
                        ),
                      }));
                    }}
                  >
                    <SelectTrigger className="h-11 w-[100px] bg-white">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <p className="text-xs text-muted-foreground">
                  Time Zone: Indian Standard Time (IST)
                </p>
              </div>

              {/* DURATION */}
              <div className="space-y-2">
                <Label>
                  Class Duration
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Select
                  value={form.durationMinutes}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      durationMinutes: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-11 w-full bg-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="45">45 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                    <SelectItem value="90">1 Hour 30 Minutes</SelectItem>
                    <SelectItem value="120">2 Hours</SelectItem>
                    <SelectItem value="180">3 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ZOOM LINK */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="zoomLink">
                  Meeting Link
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    Optional
                  </span>
                </Label>

                <div className="relative">
                  <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="zoomLink"
                    name="zoomLink"
                    value={form.zoomLink}
                    onChange={handleChange}
                    placeholder="Paste Zoom or meeting link"
                    className="h-11 bg-white pl-10"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Leave this field empty if the meeting link is generated
                  automatically.
                </p>
              </div>
            </div>

            {/* ACTION */}
            <div className="mt-6 flex justify-end border-t pt-6">
              <Button
                onClick={handleCreate}
                disabled={!isFormValid || loading}
                className="min-w-[170px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Schedule Class
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ================= SCHEDULED CLASSES ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-md font-semibold text-slate-900">
                Scheduled Classes
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage your upcoming live sessions.
              </p>
            </div>

            {classes.length > 0 && (
              <div className="rounded-full border bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground">
                {classes.length} {classes.length === 1 ? "Class" : "Classes"}
              </div>
            )}
          </div>

          {/* EMPTY STATE */}
          {classes.length === 0 ? (
            <Card className="border-dashed shadow-none">
              <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <CalendarDays className="h-6 w-6 text-slate-500" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  No classes scheduled
                </h3>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Your scheduled live classes will appear here once you create
                  your first session.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {classes.map((cls) => (
                <Card
                  key={cls._id}
                  className="group overflow-hidden border-slate-200 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                      {/* DATE BLOCK */}
                      <div className="flex items-center gap-4 border-b bg-slate-50 px-5 py-4 lg:w-[150px] lg:flex-col lg:justify-center lg:border-b-0 lg:border-r lg:py-6">
                        <CalendarDays className="h-5 w-5 text-primary" />

                        <div className="lg:text-center">
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {format(new Date(cls.date), "MMM")}
                          </p>

                          <p className="text-xl font-bold text-slate-900">
                            {format(new Date(cls.date), "dd")}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {format(new Date(cls.date), "yyyy")}
                          </p>
                        </div>
                      </div>

                      {/* CLASS INFORMATION */}
                      {/* CLASS INFORMATION */}
                      <div className="flex-1 p-5">
                        <h3 className="text-base font-semibold text-slate-900">
                          {cls.topic}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-4 w-4" />

                            <span>{cls.courseId?.title || "No Course"}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <UserRound className="h-4 w-4" />

                            <span>{cls.trainerId?.name || "No Trainer"}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />

                            <span>{formatTime(cls.time)} IST</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-slate-700">
                              Duration:
                            </span>

                            <span>{cls.durationMinutes} minutes</span>
                          </div>
                        </div>

                        <div className="mt-3 rounded-lg border bg-slate-50 px-4 py-3">
                          <div className="grid gap-3 text-sm sm:grid-cols-2">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Starts At
                              </p>

                              <p className="mt-0.5 font-medium text-slate-900">
                                {formatDateTimeIST(cls.startTime)}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">
                                Ends At
                              </p>

                              <p className="mt-0.5 font-medium text-slate-900">
                                {formatDateTimeIST(cls.endTime)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ACTIONS */}
                      <div className="flex gap-2 border-t px-5 py-4 lg:border-l lg:border-t-0">
                        {cls.zoomLink && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={cls.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4 cursor-pointer" />
                              Join Class
                            </a>
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="destructive"
                          className="cursor-pointer"
                          disabled={deletingId === cls._id}
                          onClick={() => deleteClass(cls._id)}
                        >
                          {deletingId === cls._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
