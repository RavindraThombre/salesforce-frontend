"use client";

import { useState } from "react";

import { Eye, EyeOff, KeyRound, Video } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Settings } from "../lib/settings.type";

interface IntegrationSettingsCardProps {
  form: Settings;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IntegrationSettingsCard({
  form,
  onChange,
}: IntegrationSettingsCardProps) {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Zoom Integration
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="zoomApiKey" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Zoom API Key
          </Label>

          <Input
            id="zoomApiKey"
            name="zoomApiKey"
            value={form.zoomApiKey}
            onChange={onChange}
            placeholder="Enter Zoom API Key"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zoomSecret" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Zoom Secret
          </Label>

          <div className="relative">
            <Input
              id="zoomSecret"
              name="zoomSecret"
              type={showSecret ? "text" : "password"}
              value={form.zoomSecret}
              onChange={onChange}
              placeholder="Enter Zoom Secret"
              className="pr-12"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => setShowSecret((prev) => !prev)}
            >
              {showSecret ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
