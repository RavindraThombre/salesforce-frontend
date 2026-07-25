"use client";

import { Badge } from "@/components/ui/badge";

import { Payment } from "../lib/payment.type";

interface PaymentStatusBadgeProps {
  status: Payment["status"];
}

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  switch (status) {
    case "Paid":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Paid
        </Badge>
      );

    case "Pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          Pending
        </Badge>
      );

    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}
