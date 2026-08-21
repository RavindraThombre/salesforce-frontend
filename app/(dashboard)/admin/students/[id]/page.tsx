"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
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

type Student = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  role: string;
  status: string;
  createdAt: string;
};

type Payment = {
  _id: string;
  courseId: Course | null;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentType: "FREE" | "PAID";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
};

export type Certificate = {
  _id?: string;
  courseId?: Course;
  certificateUrl?: string;
  issuedAt?: string;
};

type Progress = {
  courseId?: Course;
  percentage: number;
};

type StudentDetailResponse = {
  student: Student;
  enrolledCourses: Course[];
  payments: Payment[];
  certificates: Certificate[];
  progress: Progress[];
  statistics: {
    enrolledCoursesCount: number;
    totalPayments: number;
    certificatesCount: number;
    paymentsCount: number;
    completedPaymentsCount: number;
  };
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
          student: res.data.student,
          enrolledCourses: res.data.enrolledCourses ?? [],
          payments: res.data.payments ?? [],
          certificates: res.data.certificates ?? [],
          progress: res.data.progress ?? [],
          statistics: res.data.statistics,
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
      <StudentHeader studentName={data.student.name} />

      <StudentStats
        totalCourses={data.statistics.enrolledCoursesCount}
        totalPayments={data.statistics.totalPayments}
        totalCertificates={data.statistics.certificatesCount}
      />

      <StudentProfileCard
        student={data.student}
        courses={data.enrolledCourses}
        payments={data.payments}
        certificates={data.certificates}
      />

      <StudentCoursesCard courses={data.enrolledCourses} />

      <StudentPaymentsCard payments={data.payments} />

      <StudentCertificatesCard certificates={data.certificates} />
    </div>
  );
}
