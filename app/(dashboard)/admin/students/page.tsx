"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/app/lib/axiosConfig";

type Student = {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  city: string;
  status: "Active" | "Inactive";
};
export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ✅ FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/admin/students" ,{
        headers: {
          "Cache-Control": "no-cache" // ✅ FIXED CACHE
        }
      }); // ✅ FIXED
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ FILTER
  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
      student.userId?.email.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || student.status === filter;

    return matchSearch && matchFilter;
  });

  // ✅ DELETE
  const deleteStudent = async (id: string) => {
    try {
      await apiClient.delete(`/admin/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Students</h1>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4">
        <Input
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium">No students found</p>
        </div>
      ) : (
        filteredStudents.map((student) => (
          <Card key={student._id}>
            <CardContent className="p-4 flex justify-between items-center">

              {/* INFO */}
              <div>
                <p className="font-semibold">{student.userId?.name}</p>

                <p className="text-sm text-muted-foreground">
                  {student.userId?.email}
                </p>

                <p className="text-sm text-muted-foreground">
                  {student.city}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 items-center">

                <span
                  className={`text-sm font-semibold ${
                    student.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {student.status}
                </span>

                <Link href={`/admin/students/${student._id}`}>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </Link>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteStudent(student._id)}
                >
                  Remove
                </Button>

              </div>

            </CardContent>
          </Card>
        ))
      )}

    </div>
  );
}