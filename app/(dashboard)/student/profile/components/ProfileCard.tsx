"use client";

import { ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Profile } from "../lib/profile.type";

interface ProfileCardProps {
  profile: Profile;
  saving: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export default function ProfileCard({
  profile,
  saving,
  onChange,
  onSave,
}: ProfileCardProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              name="name"
              value={profile.name}
              onChange={onChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input id="email" value={profile.email} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>

            <Input
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={onChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>

            <Input
              id="city"
              name="city"
              value={profile.city}
              onChange={onChange}
              placeholder="Enter your city"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
