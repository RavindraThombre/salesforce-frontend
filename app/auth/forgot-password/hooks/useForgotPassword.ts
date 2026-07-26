"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { forgotPassword } from "../lib/forgotPasswordService";

export default function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword({
        email: normalizedEmail,
      });

      setSubmittedEmail(normalizedEmail);
      setEmailSent(true);

      toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Unable to send reset link.",
        );
      } else {
        toast.error("Unable to send reset link.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setEmail("");
    setSubmittedEmail("");
    setEmailSent(false);
  };

  return {
    email,
    submittedEmail,
    loading,
    emailSent,

    handleChange,
    handleSubmit,
    handleTryAgain,
  };
}
