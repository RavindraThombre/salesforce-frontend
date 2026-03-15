"use client";

import { useEffect, useState } from "react";
import { getStudentProfile, saveStudentProfile, StudentProfile } from "@/lib/studentProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEnrollments } from "@/lib/enrollment";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    // setProfile(getStudentProfile());
    // setEnrolledCount(getEnrollments().length);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveStudentProfile(profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* STATS */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Enrolled Courses</p>
            <p className="text-2xl font-bold">{enrolledCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="text-2xl font-bold">Student</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-2xl font-bold text-green-600">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* PROFILE FORM */}
      <Card className="max-w-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Profile Information</h2>

          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" value={profile.name} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" value={profile.email} disabled />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input name="phone" value={profile.phone} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>City</Label>
            <Input name="city" value={profile.city} onChange={handleChange} />
          </div>

          <Button onClick={handleSave} className="mt-4 w-full">
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
