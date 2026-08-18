"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CoverLetterCardProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_LENGTH = 2000;

export default function CoverLetterCard({
  value,
  onChange,
}: CoverLetterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cover Letter</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Textarea
          rows={8}
          placeholder="Tell us why you're interested in this role, your relevant experience, and what makes you a great fit. (Optional)"
          value={value}
          maxLength={MAX_LENGTH}
          onChange={(event) => onChange(event.target.value)}
        />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Optional</span>

          <span>
            {value.length}/{MAX_LENGTH}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
