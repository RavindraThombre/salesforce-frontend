"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/app/lib/axiosConfig";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CreateTrainerPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await apiClient.post("/trainers/create", form);

      router.push("/admin/trainers");
      toast.success("Trainer created successfully");
    } catch (error) {
      console.error("Create trainer error:", error);
      toast.error("Failed to create trainer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md shadow-lg border">
        
        {/* HEADER */}
        <CardHeader>
          <CardTitle>Create Trainer</CardTitle>
          <CardDescription>
            Add a new trainer to your system
          </CardDescription>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-4">

          {/* NAME */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Enter trainer name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* BUTTON */}
          <Button
            className="w-full mt-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Trainer"}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}