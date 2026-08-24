"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  CalendarDays,
  Clock3,
  ExternalLink,
  GraduationCap,
  Loader2,
  Tag,
  UserRound,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createLiveClass, updateLiveClass } from "../api/liveClass.service";

import {
  Course,
  initialForm,
  LiveClass,
  LiveClassForm,
  Trainer,
} from "../lib/liveClass.type";

interface CreateLiveClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: Course[];
  trainers: Trainer[];
  editData?: LiveClass | null;
  onSuccess: () => void;
}

export default function CreateLiveClassDialog({
  open,
  onOpenChange,
  courses,
  trainers,
  editData,
  onSuccess,
}: CreateLiveClassDialogProps) {
  const [form, setForm] = useState<LiveClassForm>(initialForm);

  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(editData);

  useEffect(() => {
    if (!open) return;

    if (editData) {
      setForm({
        courseId:
          typeof editData.courseId === "string"
            ? editData.courseId
            : editData.courseId?._id || "",

        trainerId:
          typeof editData.trainerId === "string"
            ? editData.trainerId
            : editData.trainerId?._id || "",
        topic: editData.topic || "",
        date: editData.date
          ? new Date(editData.date).toISOString().split("T")[0]
          : "",

        time: editData.time || "",
        durationMinutes: String(editData.durationMinutes || ""),
        zoomLink: editData.zoomLink || "",
        isFree: editData.isFree ?? false,
      });
    } else {
      setForm({ ...initialForm });
    }
  }, [editData, open]);

  const handleClose = () => {
    if (loading) return;
    setForm({ ...initialForm });
    onOpenChange(false);
  };

  const handleSubmit = async () => {
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

    const durationMinutes = Number(form.durationMinutes);

    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      toast.error("Enter a valid duration");
      return;
    }

    const payload = {
      courseId: form.courseId,
      trainerId: form.trainerId,
      topic: form.topic.trim(),
      date: form.date,
      time: form.time,
      durationMinutes,
      zoomLink: form.zoomLink.trim() || undefined,
      isFree: form.isFree,
    };

    try {
      setLoading(true);

      if (isEdit && editData?._id) {
        await updateLiveClass(editData._id, payload);
        toast.success("Live class updated successfully");
      } else {
        await createLiveClass(payload);

        toast.success("Live class scheduled successfully");
      }

      await onSuccess();

      setForm({ ...initialForm });

      onOpenChange(false);
    } catch (error: unknown) {
      console.error("Live class save error:", error);

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

      toast.error(
        message || `Failed to ${isEdit ? "update" : "schedule"} live class`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
          return;
        }

        onOpenChange(value);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border p-0 sm:max-w-3xl">
        {/* HEADER */}
        <div className="border-b bg-muted/30 px-6 py-6 sm:px-8">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Video className="h-5 w-5" />
              </div>

              <div>
                <DialogTitle className="text-xl font-semibold">
                  {isEdit ? "Update Live Class" : "Schedule Live Class"}
                </DialogTitle>

                <DialogDescription className="mt-1">
                  {isEdit
                    ? "Update the class schedule and session details."
                    : "Create a new live session and assign it to a trainer."}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* FORM */}
        <div className="space-y-6 px-6 py-6 sm:px-8">
          {/* ASSIGNMENT */}
          <div className="rounded-xl border bg-muted/20 p-5 sm:p-6">
            <div className="mb-5">
              <h3 className="text-base font-semibold">Class Assignment</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Select the course and trainer for this live session.
              </p>
            </div>

            <div className="grid min-w-0 gap-5 md:grid-cols-2">
              {/* COURSE */}
              <div className="min-w-0 space-y-2.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Course
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
                  <SelectTrigger className="h-12 w-full min-w-0 bg-background">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>

                  <SelectContent className="max-h-72">
                    {courses.length === 0 ? (
                      <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                        No courses available
                      </div>
                    ) : (
                      courses.map((course) => (
                        <SelectItem
                          key={course._id}
                          value={course._id}
                          className="min-w-0 py-3"
                        >
                          <span
                            className="block max-w-[400px] truncate"
                            title={course.title}
                          >
                            {course.title}
                          </span>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* TRAINER */}
              <div className="min-w-0 space-y-2.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <UserRound className="h-4 w-4 text-primary" />
                  Trainer
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
                  <SelectTrigger className="h-12 w-full min-w-0 bg-background">
                    <SelectValue placeholder="Select a trainer" />
                  </SelectTrigger>

                  <SelectContent className="max-h-72">
                    {trainers.length === 0 ? (
                      <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                        No trainers available
                      </div>
                    ) : (
                      trainers.map((trainer) => (
                        <SelectItem
                          key={trainer._id}
                          value={trainer._id}
                          className="py-3"
                        >
                          <span className="block truncate">{trainer.name}</span>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* SESSION DETAILS */}
          <div className="space-y-4 border-t pt-6">
            <div>
              <h3 className="text-sm font-semibold">Session Details</h3>

              <p className="text-xs text-muted-foreground">
                Add the topic, date, time and duration.
              </p>
            </div>

            {/* TOPIC */}
            <div className="space-y-2">
              <Label>Class Topic</Label>

              <Input
                value={form.topic}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    topic: event.target.value,
                  }))
                }
                placeholder="Example: Introduction to Apex Triggers"
                className="h-11"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* DATE */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Class Date
                </Label>

                <Input
                  type="date"
                  value={form.date}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      date: event.target.value,
                    }))
                  }
                  className="h-11"
                />
              </div>

              {/* TIME */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  Start Time
                </Label>

                <Input
                  type="time"
                  value={form.time}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      time: event.target.value,
                    }))
                  }
                  className="h-11"
                />
              </div>

              {/* DURATION */}
              <div className="space-y-2">
                <Label>Duration (Minutes)</Label>

                <Input
                  type="number"
                  min="1"
                  value={form.durationMinutes}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      durationMinutes: event.target.value,
                    }))
                  }
                  placeholder="Example: 60"
                  className="h-11"
                />
              </div>

              {/* CLASS TYPE */}
              <div className="space-y-2.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="h-4 w-4 text-primary" />
                  Class Type
                </Label>

                <Select
                  value={form.isFree ? "free" : "paid"}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      isFree: value === "free",
                    }))
                  }
                >
                  <SelectTrigger className="h-12 w-full bg-background">
                    <SelectValue placeholder="Select class type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="paid">Paid Class</SelectItem>

                    <SelectItem value="free">Free Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* ZOOM */}
          <div className="space-y-4 border-t pt-6">
            <div>
              <h3 className="text-sm font-semibold">Meeting Details</h3>

              <p className="text-xs text-muted-foreground">
                Leave the Zoom link empty to generate it automatically.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-primary" />
                Zoom Meeting Link
                <span className="font-normal text-muted-foreground">
                  (Optional)
                </span>
              </Label>

              <Input
                value={form.zoomLink}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    zoomLink: event.target.value,
                  }))
                }
                placeholder="Auto-generated if left empty"
                className="h-11"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t bg-background px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="h-11 min-w-28"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="h-11 min-w-40"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {loading
              ? isEdit
                ? "Updating..."
                : "Scheduling..."
              : isEdit
                ? "Update Class"
                : "Schedule Class"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
