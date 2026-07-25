"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  ChangePasswordPayload,
  PasswordForm,
  Profile,
  UpdateProfilePayload,
} from "../lib/profile.type";

import {
  changePassword,
  getProfile,
  updateProfile,
} from "../lib/profileService";

const initialProfile: Profile = {
  name: "",
  email: "",
  phone: "",
  city: "",
  role: "",
};

const initialPasswords: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function useProfile() {
  const [profile, setProfile] = useState<Profile>(initialProfile);

  const [passwords, setPasswords] = useState<PasswordForm>(initialPasswords);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  /* ---------------- FETCH PROFILE ---------------- */

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProfile();

      setProfile({
        ...initialProfile,
        ...data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to load profile.");
      } else {
        toast.error("Failed to load profile.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ---------------- PROFILE ---------------- */

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    if (!profile.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const payload: UpdateProfilePayload = {
        name: profile.name,
        phone: profile.phone,
        city: profile.city,
      };

      const updatedProfile = await updateProfile(payload);

      setProfile({
        ...initialProfile,
        ...updatedProfile,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to update profile.",
        );
      } else {
        toast.error("Failed to update profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- PASSWORD ---------------- */

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserPassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!passwords.newPassword.trim()) {
      toast.error("New password is required.");
      return;
    }

    try {
      setChangingPassword(true);

      const payload: ChangePasswordPayload = {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      };

      await changePassword(payload);

      toast.success("Password updated successfully.");

      setPasswords(initialPasswords);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to update password.",
        );
      } else {
        toast.error("Failed to update password.");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  return {
    profile,
    passwords,

    loading,
    saving,
    changingPassword,

    handleProfileChange,
    handlePasswordChange,

    saveProfile,
    updateUserPassword,

    fetchProfile,
  };
}
