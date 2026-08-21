"use client";

import { CreditCard, IndianRupee, Receipt, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Course = {
  _id: string;
  title: string;
};

type Payment = {
  _id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentType: "FREE" | "PAID";
  createdAt?: string;
  courseId: Course | null;
};

type Props = {
  payments: Payment[];
};

export default function StudentPaymentsCard({ payments }: Props) {
  const completedPayments = payments.filter(
    (payment) => payment.status === "completed",
  );

  const totalAmount = completedPayments.reduce(
    (sum, payment) => sum + (Number(payment.amount) || 0),
    0,
  );

  return (
    <Card className="overflow-hidden rounded-3xl border shadow-sm transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary/5 to-transparent px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Payment History</h2>

            <p className="text-sm text-muted-foreground">
              Student payment transactions
            </p>
          </div>
        </div>

        <Badge variant="secondary">
          {payments.length} Payment
          {payments.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <CardContent className="p-6">
        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Wallet className="mb-4 h-12 w-12 text-muted-foreground/40" />

            <h3 className="font-semibold">No Payments Found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              This student has not made any payments yet.
            </p>
          </div>
        ) : (
          <>
            {/* Total */}
            <div className="mb-6 rounded-2xl border bg-primary/5 p-5">
              <p className="text-sm text-muted-foreground">Total Amount Paid</p>

              <h2 className="mt-2 flex items-center gap-2 text-3xl font-bold text-primary">
                <IndianRupee className="h-7 w-7" />

                {totalAmount.toLocaleString("en-IN")}
              </h2>
            </div>

            {/* Payment List */}
            <div className="space-y-4">
              {payments.map((payment) => {
                const isCompleted = payment.status === "completed";

                const isFailed = payment.status === "failed";

                return (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4 transition hover:bg-muted/40"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-primary/10 p-3">
                        <Receipt className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">
                          {payment.courseId?.title || "Course Payment"}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {payment.paymentType === "FREE"
                            ? "Free Enrollment"
                            : "Paid Course"}
                        </p>

                        {payment.createdAt && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(payment.createdAt).toLocaleDateString(
                              "en-IN",
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        ₹{Number(payment.amount || 0).toLocaleString("en-IN")}
                      </p>

                      <Badge
                        variant={isCompleted ? "default" : "secondary"}
                        className={
                          isCompleted
                            ? "mt-1 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400"
                            : isFailed
                              ? "mt-1 bg-red-100 text-red-700 hover:bg-red-100"
                              : "mt-1"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
