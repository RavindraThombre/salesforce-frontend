"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
import { Card, CardContent } from "@/components/ui/card";

type Course = {
  _id: string;
  title: string;
};

type StudentDetailResponse = {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  city: string;
  courses: Course[];
  payments: number[];
  certificates: string[];
};

export default function StudentDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [data, setData] = useState<StudentDetailResponse | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await apiClient.get(`/admin/students/${id}`, {
          headers: { "Cache-Control": "no-cache" },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Student Details</h1>

      {/* PROFILE */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <p><strong>Name:</strong> {data.userId?.name || "N/A"}</p>
          <p><strong>Email:</strong> {data.userId?.email || "N/A"}</p>
          <p><strong>City:</strong> {data.city || "N/A"}</p>
        </CardContent>
      </Card>

      {/* COURSES */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">Enrolled Courses</h2>
          {data.courses.length === 0 ? (
            <p>No courses</p>
          ) : (
            data.courses.map((c) => (
              <p key={c._id}>{c.title}</p>
            ))
          )}
        </CardContent>
      </Card>

      {/* PAYMENTS */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">Payments</h2>
          {data.payments.length === 0 ? (
            <p>No payments</p>
          ) : (
            data.payments.map((amount, i) => (
              <p key={i}>₹{amount}</p>
            ))
          )}
        </CardContent>
      </Card>

      {/* CERTIFICATES */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">Certificates</h2>
          {data.certificates.length === 0 ? (
            <p>No certificates</p>
          ) : (
            data.certificates.map((c, i) => (
              <p key={i}>{c}</p>
            ))
          )}
        </CardContent>
      </Card>

    </div>
  );
}