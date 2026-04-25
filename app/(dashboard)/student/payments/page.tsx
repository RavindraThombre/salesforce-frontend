"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPayments, Payment } from "./lib/payment";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPayments();
        setPayments(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment History</h2>

      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="py-2">Course</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b">
                    <td className="py-3">{payment.course}</td>

                    <td>₹ {payment.amount}</td>

                    <td>
                      {new Date(payment.date).toDateString()}
                    </td>

                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          payment.status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(payment.invoiceUrl, "_blank")
                        }
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}