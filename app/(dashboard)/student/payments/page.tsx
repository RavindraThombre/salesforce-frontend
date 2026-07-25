"use client";

import PaymentHeader from "./components/PaymentHeader";
import PaymentStats from "./components/PaymentStats";
import PaymentsTable from "./components/PaymentsTable";
import PaymentsSkeleton from "./components/PaymentsSkeleton";

import usePayments from "./hooks/usePayments";

export default function PaymentsPage() {
  const payment = usePayments();

  if (payment.loading) {
    return <PaymentsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PaymentHeader />

      <PaymentStats payments={payment.payments} />

      <PaymentsTable payments={payment.payments} />
    </div>
  );
}
