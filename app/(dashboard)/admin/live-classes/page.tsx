"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

type LiveClass = {
  _id: string;
  courseId: { title: string };
  trainerId: { name: string };
  topic: string;
  date: string;
  time: string;
  zoomLink: string;
};

type Course = {
  _id: string;
  title: string;
};

type Trainer = {
  _id: string;
  name: string;
};

export default function LiveClassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    courseId: "",
    trainerId: "",
    topic: "",
    date: "",
    time: "",
    zoomLink: "",
  });

  const hasFetched = useRef(false);


  const fetchData = async () => {
  try {
    const [coursesRes, classesRes, trainersRes] = await Promise.all([
      apiClient.get("/courses"),
      apiClient.get("/admin/live-classes", {
        headers: { "Cache-Control": "no-cache" },
      }),
      apiClient.get("/trainers"),
    ]);

    setCourses(coursesRes.data);
    setClasses(classesRes.data);
    setTrainers(trainersRes.data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

useEffect(() => {
  if (hasFetched.current) return; // ✅ prevents double call

  hasFetched.current = true;

  (async () => {
    try {
      const [coursesRes, classesRes, trainersRes] = await Promise.all([
        apiClient.get("/courses"),
        apiClient.get("/admin/live-classes", {
          headers: { "Cache-Control": "no-cache" },
        }),
        apiClient.get("/trainers"),
      ]);

      setCourses(coursesRes.data);
      setClasses(classesRes.data);
      setTrainers(trainersRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  })();
}, []);

  // ✅ HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE CLASS
  const handleCreate = async () => {
    if(!form.courseId || !form.topic || !form.date || !form.time || !form.trainerId) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await apiClient.post("/admin/live-classes", form);
      await fetchData(); 
      toast.success("Live class scheduled successfully");
      setForm({
        courseId: "",
        trainerId: "",
        topic: "",
        date: "",
        time: "",
        zoomLink: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to schedule class");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE CLASS
  const deleteClass = async (id: string) => {
    try {
      await apiClient.delete(`/admin/live-classes/${id}`);
      setClasses((prev) => prev.filter((c) => c._id !== id)); 
      toast.success("Class deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete class");
    }
  };

  return (
  <div className="p-6 space-y-8">

    {/* ================= CREATE SECTION ================= */}
    <Card className="max-w-3xl mx-auto shadow-md">
      <CardContent className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h2 className="text-xl font-semibold">Schedule New Class</h2>
          <p className="text-sm text-muted-foreground">
            Create and assign a live class to a trainer
          </p>
        </div>

        {/* FORM GRID */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* COURSE */}
          <div className="space-y-1">
  <Label>Course</Label>

  <Select
    value={form.courseId}
    onValueChange={(value) =>
      setForm({ ...form, courseId: value })
    }
  >
    <SelectTrigger className="w-full h-10">
      <SelectValue placeholder="Select Course" />
    </SelectTrigger>

    <SelectContent  className="z-[9999]">
      {courses.map((c) => (
        <SelectItem key={c._id} value={c._id}>
          {c.title}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

          {/* TRAINER */}
        <div className="space-y-1">
  <Label>Trainer</Label>

  <Select
    value={form.trainerId}
    onValueChange={(value) =>
      setForm({ ...form, trainerId: value })
    }
  >
    <SelectTrigger className="w-full h-10">
      <SelectValue placeholder="Select Trainer" />
    </SelectTrigger>

    <SelectContent  className="z-[9999]">
      {trainers.map((t) => (
        <SelectItem key={t._id} value={t._id}>
          {t.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

          {/* TOPIC */}
          <div className="md:col-span-2 space-y-1">
            <Label>Topic</Label>
            <Input
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="Enter class topic"
              className=" h-10"
            />
          </div>

          {/* DATE */}
         <div className="space-y-1">
  <Label>Class Date</Label>

  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className="w-full h-10 justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {form.date ? format(new Date(form.date), "PPP") : "Pick a date"}
      </Button>
    </PopoverTrigger>

    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={form.date ? new Date(form.date) : undefined}
        onSelect={(selectedDate) => {
          setForm({
            ...form,
            date: selectedDate?.toISOString() || "",
          });
        }}
        initialFocus
      />
    </PopoverContent>
  </Popover>
</div>

          {/* TIME */}
         <div className="space-y-1">
  <Label>Class Time</Label>

 <div className="relative">
  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

  <input
    type="time"
    name="time"
    value={form.time}
    onChange={handleChange}
    className="w-full h-10 border rounded-md pl-10 pr-3 bg-background outline-none"
  />
</div>
</div>

          {/* ZOOM */}
          <div className="md:col-span-2 space-y-1">
            <Label>Zoom Link (Optional)</Label>
            <Input
              name="zoomLink"
              value={form.zoomLink}
              onChange={handleChange}
              placeholder="Auto-generated if left empty"
              className=" h-10"
            />
          </div>

        </div>

        {/* BUTTON */}
        <Button
          onClick={handleCreate}
          disabled={
            !form.courseId ||
            !form.trainerId ||
            !form.topic ||
            !form.date ||
            !form.time
          }
          className="w-full"
        >
          {loading ? "Scheduling..." : "Schedule Class"}
        </Button>

      </CardContent>
    </Card>

    {/* ================= LIST SECTION ================= */}
    <div className="space-y-4 max-w-3xl mx-auto">

      <h2 className="text-xl font-semibold">Scheduled Classes</h2>

      {classes.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No classes scheduled yet
          </CardContent>
        </Card>
      ) : (
        classes.map((cls) => (
          <Card key={cls._id} className="hover:shadow-md transition">
            <CardContent className="p-4 flex justify-between items-center">

              {/* LEFT */}
              <div>
                <p className="font-semibold">{cls.topic}</p>

                <p className="text-sm text-muted-foreground">
                  {cls.courseId?.title} • {cls.trainerId?.name || "No Trainer"}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  📅 {new Date(cls.date).toLocaleDateString()} • ⏰ {cls.time}
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex gap-2">
                <a href={cls.zoomLink} target="_blank">
                  <Button size="sm">Open</Button>
                </a>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteClass(cls._id)}
                >
                  Delete
                </Button>
              </div>

            </CardContent>
          </Card>
        ))
      )}

    </div>
  </div>
);
}