"use client";

import { Globe, Mail, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Settings } from "../lib/settings.type";

interface GeneralSettingsCardProps {
  form: Settings;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function GeneralSettingsCard({
  form,
  onChange,
}: GeneralSettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          General Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="siteName">Website Name</Label>

          <Input
            id="siteName"
            name="siteName"
            value={form.siteName}
            onChange={onChange}
            placeholder="Salesforce Academy"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supportEmail" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Support Email
          </Label>

          <Input
            id="supportEmail"
            name="supportEmail"
            type="email"
            value={form.supportEmail}
            onChange={onChange}
            placeholder="support@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Support Phone
          </Label>

          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="+91 9876543210"
          />
        </div>
      </CardContent>
    </Card>
  );
}
