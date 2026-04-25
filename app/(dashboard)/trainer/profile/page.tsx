"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/utils/getErrorMessage";

type User = {
  name: string;
  email: string;
  bio?: string;
  expertise?: string;
  avatar?: string;
};

export default function Page() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    bio: "",
    expertise: "",
    avatar: "",
  });

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // ✅ FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/trainers/profile");
        setUser(res.data);
      } catch {
        toast.error("Failed to load profile ❌");
      }
    };

    fetchProfile();
  }, []);

  // ✅ IMAGE PREVIEW
  const handleImage = (file: File) => {
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("bio", user.bio || "");
      formData.append("expertise", user.expertise || "");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await apiClient.put("/trainers/profile", formData);

      setUser(res.data);
      setEdit(false);
      toast.success("Profile updated ✅");
    } catch {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CHANGE PASSWORD
  const handlePassword = async () => {
    try {
      await apiClient.put("/trainers/change-password", passwords);
      toast.success("Password changed ✅");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
        toast.error(getErrorMessage(err) || "Password change failed ❌");
    }
  };

  return (
    <div className="p-6 space-y-6 flex flex-col items-center">

      {/* ================= PROFILE ================= */}
      <Card className="max-w-md w-full">
        <CardContent className="p-6 space-y-4 text-center">

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={
                preview ||
                (user.avatar
                  ? `http://localhost:5000${user.avatar}`
                  : "/default.png")
              }
              className="w-20 h-20 rounded-full object-cover"
            />

            {edit && (
              <input
                type="file"
                onChange={(e) =>
                  e.target.files && handleImage(e.target.files[0])
                }
              />
            )}
          </div>

          {/* NAME */}
          <Input
            value={user.name}
            // disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />

          {/* EMAIL */}
          <Input value={user.email} disabled />

          {/* BIO */}
          <Input
            placeholder="Bio"
            value={user.bio || ""}
            // disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, bio: e.target.value })
            }
          />

          {/* EXPERTISE */}
          <Input
            placeholder="Expertise"
            value={user.expertise || ""}
            // disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, expertise: e.target.value })
            }
          />

          {/* ACTIONS */}
          {edit ? (
            <div className="flex gap-2">
              <Button
                className="w-full"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEdit(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => setEdit(true)}>
              Edit Profile
            </Button>
          )}

        </CardContent>
      </Card>

      {/* ================= CHANGE PASSWORD ================= */}
      <Card className="max-w-md w-full">
        <CardContent className="p-6 space-y-4">

          <h3 className="font-semibold">Change Password</h3>

          <Input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                currentPassword: e.target.value,
              })
            }
          />

          <Input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                newPassword: e.target.value,
              })
            }
          />

          <Button className="w-full" onClick={handlePassword}>
            Change Password
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}