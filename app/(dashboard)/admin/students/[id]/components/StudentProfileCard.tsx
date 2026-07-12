"use client";

import {
  Mail,
  MapPin,
  User,
  GraduationCap,
  CreditCard,
  Award,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Student = {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  city: string;
  courses: {
    _id: string;
    title: string;
  }[];
  payments: number[];
  certificates: string[];
};

type Props = {
  student: Student;
};

export default function StudentProfileCard({ student }: Props) {
  const initials = student.userId.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Card className="overflow-hidden rounded-3xl border shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-8 py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Avatar */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground shadow-lg">
            {initials}
          </div>

          {/* Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{student.userId.name}</h2>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {student.userId.email}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {student.city || "N/A"}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">
                <GraduationCap className="mr-1 h-3 w-3" />
                {student.courses.length} Courses
              </Badge>

              <Badge variant="secondary">
                <CreditCard className="mr-1 h-3 w-3" />
                {student.payments.length} Payments
              </Badge>

              <Badge variant="secondary">
                <Award className="mr-1 h-3 w-3" />
                {student.certificates.length} Certificates
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Details */}
      <CardContent className="p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-muted/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />

              <h3 className="font-semibold">Student Information</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Student ID</p>

                <p className="font-medium">{student._id}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Name</p>

                <p className="font-medium">{student.userId.name}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Email</p>

                <p className="font-medium break-all">{student.userId.email}</p>
              </div>

              <div>
                <p className="text-muted-foreground">City</p>

                <p className="font-medium">{student.city || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />

              <h3 className="font-semibold">Learning Summary</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Courses</span>

                <span className="font-semibold">{student.courses.length}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Certificates</span>

                <span className="font-semibold">
                  {student.certificates.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Payments</span>

                <span className="font-semibold">{student.payments.length}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />

              <h3 className="font-semibold">Payment Summary</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>

                <span className="font-bold text-primary">
                  ₹
                  {student.payments
                    .reduce((sum, amount) => sum + amount, 0)
                    .toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Transactions</span>

                <span className="font-semibold">{student.payments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
