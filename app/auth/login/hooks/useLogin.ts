"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import { toast } from "sonner";

import { useGoogleLogin } from "@react-oauth/google";

import { loginUser } from "../lib/loginService";

import { LoginForm } from "../lib/login.type";

import { useUser } from "@/app/context/UserContext";

import { apiClient } from "@/app/lib/axiosConfig";

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export default function useLogin() {
  const router = useRouter();

  const { login } = useUser();

  const [form, setForm] = useState<LoginForm>(initialForm);

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

  /* ================= NORMAL LOGIN ================= */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      login(data.user, data.token);

      toast.success("Login successful");

      redirectUser(data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Login failed. Please check your credentials.",
        );
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */

  const handleGoogleLogin = async (credential: string) => {
    try {
      setLoading(true);

      const response = await apiClient.post("/auth/google", {
        credential,
      });

      const data = response.data;

      login(data.user, data.token);

      toast.success("Google login successful");

      redirectUser(data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Google login failed. Please try again.",
        );
      } else {
        toast.error("Google login failed. Please try again.");
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
    handleGoogleLogin,
  };
}
