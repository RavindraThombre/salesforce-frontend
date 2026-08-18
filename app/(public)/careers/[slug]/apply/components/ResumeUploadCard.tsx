"use client";

import { useRef } from "react";
import { FileText, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumeUploadCardProps {
  resume: File | null;
  onChange: (file: File | null) => void;
}

export default function ResumeUploadCard({
  resume,
  onChange,
}: ResumeUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    onChange(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
      </CardHeader>

      <CardContent>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        {!resume ? (
          <div
            onClick={handleBrowse}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition hover:border-primary hover:bg-muted/40"
          >
            <UploadCloud className="mb-4 h-12 w-12 text-primary" />

            <h3 className="font-semibold">Upload Resume</h3>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              Click to upload your resume
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              PDF, DOC, DOCX • Max 5 MB
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-10 w-10 text-primary" />

              <div>
                <p className="font-medium">{resume.name}</p>

                <p className="text-sm text-muted-foreground">
                  {(resume.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <Button
              variant="destructive"
              size="icon"
              onClick={() => onChange(null)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
