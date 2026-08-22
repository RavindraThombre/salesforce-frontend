"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import { toast } from "sonner";

import { SignupForm } from "../lib/signup.type";
import { signupUser } from "../lib/signupService";

import { useUser } from "@/app/context/UserContext";
import { apiClient } from "@/app/lib/axiosConfig";

const initialForm: SignupForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function useSignup() {
  const router = useRouter();

  const { login } = useUser();

  const [form, setForm] = useState<SignupForm>(initialForm);

  const [loading, setLoading] = useState(false);

  const redirectUser = (user: { role: "admin" | "student" | "trainer" }) => {
    switch (user.role) {
      case "admin":
        router.push("/admin");
        break;

      case "trainer":
        router.push("/trainer");
        break;

      default:
        router.push("/student");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  /* ================= NORMAL SIGNUP ================= */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!form.password) {
      toast.error("Password is required");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await signupUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      toast.success(response.message ?? "Account created successfully!");

      router.push("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Signup failed. Please try again.",
        );
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE SIGNUP / LOGIN ================= */

  const handleGoogleSignup = async (credential: string) => {
    try {
      setLoading(true);

      const response = await apiClient.post("/auth/google", {
        credential,
      });

      const data = response.data;

      login(data.user, data.token);

      toast.success("Google authentication successful");

      redirectUser(data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Google signup failed. Please try again.",
        );
      } else {
        toast.error("Google signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,

    handleChange,
    handleSubmit,
    handleGoogleSignup,
  };
}
