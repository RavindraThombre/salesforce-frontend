import ProtectedRoute from "@/app/components/common/ProtectedRoute";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute roles={["trainer"]}>{children}</ProtectedRoute>;
}
