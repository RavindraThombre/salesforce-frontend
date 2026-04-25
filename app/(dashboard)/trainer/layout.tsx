import ProtectedRoute from "@/app/components/common/ProtectedRoute";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute role="trainer">{children}</ProtectedRoute>;
}