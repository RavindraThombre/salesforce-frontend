"use client";

import { Mail, Phone, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/context/UserContext";

interface ApplicantInformationCardProps {
  phone: string;
  onPhoneChange: (value: string) => void;
}

export default function ApplicantInformationCard({
  phone,
  onPhoneChange,
}: ApplicantInformationCardProps) {
  const { user } = useUser();

  const hasPhone = Boolean(user?.phone?.trim());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicant Information</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input readOnly value={user?.name ?? ""} className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input readOnly value={user?.email ?? ""} className="pl-10" />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Phone Number</label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                className="pl-10"
                readOnly={hasPhone}
                value={hasPhone ? (user?.phone ?? "") : phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="Enter your phone number"
                maxLength={10}
              />
            </div>

            {!hasPhone && (
              <p className="text-xs text-muted-foreground">
                Please provide your phone number for recruitment communication.
              </p>
            )}
          </div>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          Your profile information will be submitted with this application.
        </p>
      </CardContent>
    </Card>
  );
}
