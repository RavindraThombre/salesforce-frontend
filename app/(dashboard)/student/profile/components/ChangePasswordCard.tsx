"use client";

import { ChangeEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PasswordForm } from "../lib/profile.type";

interface ChangePasswordCardProps {
  passwords: PasswordForm;
  changing: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export default function ChangePasswordCard({
  passwords,
  changing,
  onChange,
  onSave,
}: ChangePasswordCardProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LockKeyhole className="h-5 w-5" />
          Change Password
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <PasswordField
          id="currentPassword"
          label="Current Password"
          value={passwords.currentPassword}
          visible={showCurrent}
          onToggle={() => setShowCurrent((prev) => !prev)}
          onChange={onChange}
        />

        <PasswordField
          id="newPassword"
          label="New Password"
          value={passwords.newPassword}
          visible={showNew}
          onToggle={() => setShowNew((prev) => !prev)}
          onChange={onChange}
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          value={passwords.confirmPassword}
          visible={showConfirm}
          onToggle={() => setShowConfirm((prev) => !prev)}
          onChange={onChange}
        />

        <div className="flex justify-end">
          <Button onClick={onSave} disabled={changing}>
            {changing ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({
  id,
  label,
  value,
  visible,
  onToggle,
  onChange,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        <Input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="pr-10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
