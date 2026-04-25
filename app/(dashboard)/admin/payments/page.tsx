"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";

type Payment = {
  _id: string;
  student: string;
  email: string;
  course: string;
  amount: number;
  status: "Paid" | "Pending";
  date: string;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/admin/payments", {
        headers: { "Cache-Control": "no-cache" },
      });
      setPayments(res.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // 🔥 VERIFY PAYMENT
  const handleVerify = async (id: string) => {
    try {
      await apiClient.put(`/admin/payments/${id}`, {
        status: "completed",
      });

      // 🔄 refresh UI
      fetchPayments();
    } catch (err) {
      console.error("Verify error:", err);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchSearch =
      payment.student.toLowerCase().includes(search.toLowerCase()) ||
      payment.course.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || payment.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6">

      {/* SEARCH + FILTER */}
      <div className="flex gap-4">
        <Input
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading payments...</p>
      ) : filteredPayments.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium">No payments found</p>
        </div>
      ) : (
        filteredPayments.map((payment) => (
          <Card key={payment._id}>
            <CardContent className="p-4 flex justify-between items-center">

              {/* LEFT */}
              <div>
                <p className="font-semibold">{payment.student}</p>

                <p className="text-sm text-muted-foreground">
                  {payment.email}
                </p>

                <p className="text-sm text-muted-foreground">
                  {payment.course}
                </p>
              </div>

              {/* RIGHT */}
              <div className="text-right space-y-2">
                <p className="font-semibold">
                  ₹{payment.amount.toLocaleString("en-IN")}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    payment.status === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {payment.status}
                </p>

                <p className="text-xs text-muted-foreground">
                  {new Date(payment.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                {/* 🔥 VERIFY BUTTON */}
                {payment.status !== "Paid" && (
                  <Button
                    size="sm"
                    onClick={() => handleVerify(payment._id)}
                  >
                    Verify Payment
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>
        ))
      )}

    </div>
  );
}