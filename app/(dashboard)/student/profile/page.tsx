"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Profile = {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  role?: string;
};

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  /* ---------------- FETCH PROFILE ---------------- */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("user/profile");
        setProfile(res.data);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ---------------- PROFILE CHANGE ---------------- */

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);

      await apiClient.put("user/profile", {
        name: profile.name,
        phone: profile.phone,
        city: profile.city,
      });

      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- PASSWORD CHANGE ---------------- */

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setChangingPass(true);

      await apiClient.put("user/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      toast.success("Password updated");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      
    } finally {
      setChangingPass(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-2 max-w-3xl space-y-2">
      {/* ---------------- PROFILE CARD ---------------- */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-center">
            Profile Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={profile.email} disabled />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                value={profile.phone || ""}
                onChange={handleProfileChange}
              />
            </div>

            <div>
              <Label>City</Label>
              <Input
                name="city"
                value={profile.city || ""}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          <Button
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full mt-2"
          >
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>

      {/* ---------------- PASSWORD CARD ---------------- */}
      <Card>
        <CardContent className="p-6 space-y-4">
         <h2 className="text-lg font-semibold text-center">
            Change Password
          </h2>

          <div className="space-y-3">
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={changingPass}
            className="w-full mt-2"
          >
            {changingPass ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}