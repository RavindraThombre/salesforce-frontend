"use client";

import { useState } from "react";
import { Plus, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { JobPositionFormValues } from "../lib/recruitment.type";

interface SkillsCardProps {
  form: JobPositionFormValues;
  setForm: React.Dispatch<React.SetStateAction<JobPositionFormValues>>;
}

export default function SkillsCard({ form, setForm }: SkillsCardProps) {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const value = skill.trim();

    if (!value) return;

    if (form.skills.includes(value)) {
      setSkill("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));

    setSkill("");
  };

  const removeSkill = (value: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== value),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Skills</CardTitle>

        <CardDescription>
          Add the technologies or skills required for this position.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Skill</Label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                className="pl-10"
                placeholder="React, Node.js, MongoDB..."
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
            </div>

            <Button type="button" onClick={addSkill}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Press Enter or click Add.
          </p>
        </div>

        {form.skills.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No skills added yet.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {form.skills.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              >
                {item}

                <button
                  type="button"
                  onClick={() => removeSkill(item)}
                  className="rounded-full p-0.5 hover:bg-background"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
