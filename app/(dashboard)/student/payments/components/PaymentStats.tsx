"use client";

import { CreditCard, IndianRupee, Clock3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Payment } from "../lib/payment.type";

interface PaymentStatsProps {
  payments: Payment[];
}

export default function PaymentStats({ payments }: PaymentStatsProps) {
  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalTransactions = payments.length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending",
  ).length;

  const stats = [
    {
      title: "Total Paid",
      value: `₹${totalPaid.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
    {
      title: "Transactions",
      value: totalTransactions,
      icon: CreditCard,
    },
    {
      title: "Pending Payments",
      value: pendingPayments,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>

                <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
                <Icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
