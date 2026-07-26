"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import { loginUser } from "../lib/loginService";
import { LoginForm } from "../lib/login.type";
import { useUser } from "@/app/context/UserContext";

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export default function useLogin() {
  const router = useRouter();
  const { login } = useUser();

  const [form, setForm] = useState<LoginForm>(initialForm);

  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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

      switch (data.user.role) {
        case "admin":
          router.push("/admin");
          break;

        case "trainer":
          router.push("/trainer");
          break;

        default:
          router.push("/student");
      }
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

  return {
    form,
    loading,

    handleChange,
    handleSubmit,
  };
}
