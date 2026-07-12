"use client";

import { useEffect, useState } from "react";

import { apiClient } from "@/app/lib/axiosConfig";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";

import StudentsHeader from "./components/StudentsHeader";
import StudentsStats from "./components/StudentsStats";
import StudentsTable from "./components/StudentsTable";

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
  const [loading, setLoading] = useState(true);

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get("/admin/students", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

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

  // ================= DELETE =================
  const deleteStudent = async (id: string) => {
    try {
      await apiClient.delete(`/admin/students/${id}`);

      fetchStudents();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return <SalesforceLoader />;
  }

  const activeStudents = students.filter(
    (student) => student.status === "Active",
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive",
  ).length;

  return (
    <div className="space-y-6">
      <StudentsHeader />

      <StudentsStats
        totalStudents={students.length}
        activeStudents={activeStudents}
        inactiveStudents={inactiveStudents}
      />

      <StudentsTable
        students={students}
        loading={loading}
        onRefresh={fetchStudents}
        onDelete={deleteStudent}
      />
    </div>
  );
}
