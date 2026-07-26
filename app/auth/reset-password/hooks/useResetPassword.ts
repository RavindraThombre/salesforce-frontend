"use client";

import { ChangeEvent, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { resetPassword } from "../lib/resetPasswordService";
import {
  ResetPasswordForm,
  ResetPasswordPayload,
} from "../lib/resetPassword.type";

const initialForm: ResetPasswordForm = {
  newPassword: "",
  confirmPassword: "",
};

export default function useResetPassword(token: string | null) {
  const [form, setForm] = useState<ResetPasswordForm>(initialForm);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isTokenValid = useMemo(() => Boolean(token), [token]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isTokenValid) {
      toast.error("Invalid password reset link.");
      return;
    }

    if (!form.newPassword.trim()) {
      toast.error("Please enter a new password.");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const payload: ResetPasswordPayload = {
        token: token!,
        newPassword: form.newPassword,
      };

      await resetPassword(payload);

      toast.success("Password reset successfully.");

      setSuccess(true);

      setForm(initialForm);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Unable to reset password.",
        );
      } else {
        toast.error("Unable to reset password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    success,
    isTokenValid,

    handleChange,
    handleSubmit,
  };
}
