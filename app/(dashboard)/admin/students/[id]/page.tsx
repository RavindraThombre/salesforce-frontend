"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
import { Card, CardContent } from "@/components/ui/card";
import StudentProfileCard from "./components/StudentProfileCard";
import StudentCoursesCard from "./components/StudentCoursesCard";
import StudentPaymentsCard from "./components/StudentPaymentsCard";
import StudentCertificatesCard from "./components/StudentCertificatesCard";
import StudentHeader from "./components/StudentHeader";
import StudentStats from "./components/StudentStats";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";

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

  courses?: Course[];
  payments?: number[];
  certificates?: string[];
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
        setData({
          ...res.data,
          courses: res.data.courses ?? [],
          payments: res.data.payments ?? [],
          certificates: res.data.certificates ?? [],
        });
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  if (!data) return <SalesforceLoader />;

  return (
    <div className="p-6 space-y-6">
      <StudentHeader studentName={data.userId.name} />

      <StudentStats
        totalCourses={data.courses?.length ?? 0}
        totalPayments={(data.payments ?? []).reduce(
          (sum, amount) => sum + amount,
          0,
        )}
        totalCertificates={data.certificates?.length ?? 0}
      />

      <StudentProfileCard
        student={{
          ...data,
          courses: data.courses ?? [],
          payments: data.payments ?? [],
          certificates: data.certificates ?? [],
        }}
      />

      <StudentCoursesCard courses={data.courses ?? []} />

      <StudentPaymentsCard payments={data.payments ?? []} />

      <StudentCertificatesCard certificates={data.certificates ?? []} />
    </div>
  );
}
