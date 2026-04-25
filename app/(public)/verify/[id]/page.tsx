"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";

type VerifyData = {
  valid: boolean;
  student: string;
  course: string;
  date: string;
};

export default function VerifyPage() {
  const { id } = useParams();
  const [data, setData] = useState<VerifyData | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVerification = async () => {
      try {
        const res = await apiClient.get(
          `/public/verify/${id}` // 🔥 API CALL HERE
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVerification();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  if (!data.valid) {
    return <h2 className="text-red-500">❌ Invalid Certificate</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-green-600 text-xl font-bold">
        ✅ Certificate Verified
      </h2>

      <p>Student: {data.student}</p>
      <p>Course: {data.course}</p>
      <p>Date: {new Date(data.date).toDateString()}</p>
    </div>
  );
}