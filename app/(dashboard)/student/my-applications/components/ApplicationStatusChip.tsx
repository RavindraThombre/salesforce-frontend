import { Badge } from "@/components/ui/badge";

import { ApplicationStatus } from "../lib/myApplications.type";

interface ApplicationStatusChipProps {
  status: ApplicationStatus;
}

export default function ApplicationStatusChip({
  status,
}: ApplicationStatusChipProps) {
  const statusStyles: Record<ApplicationStatus, string> = {
    Applied: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",

    Shortlisted:
      "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50",

    "Interview Scheduled":
      "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50",

    Selected: "border-green-200 bg-green-50 text-green-700 hover:bg-green-50",

    Rejected: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
  };

  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status}
    </Badge>
  );
}
