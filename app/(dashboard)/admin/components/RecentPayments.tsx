"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, IndianRupee } from "lucide-react";

type Payment = {
  amount: number;
  createdAt: string;
};

type Props = {
  payments: Payment[];
};

export default function RecentPayments({ payments }: Props) {
  return (
    <Card className="rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-green-500/10 p-3">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Recent Payments</h2>

            <p className="text-sm text-muted-foreground">
              Latest successful transactions
            </p>
          </div>
        </div>

        <Badge>{payments.length}</Badge>
      </div>

      <div className="divide-y">
        {payments.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No payments found.
          </div>
        ) : (
          payments.map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-green-500/10 p-3">
                  <IndianRupee className="h-5 w-5 text-green-600" />
                </div>

                <div>
                  <p className="font-medium">
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <Badge
                variant="secondary"
                className="bg-green-500/10 text-green-600"
              >
                Success
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
