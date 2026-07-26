"use client";

import AuthBackground from "../login/components/AuthBackground";
import LoginBranding from "../login/components/LoginBranding";
import ForgotPasswordCard from "./components/ForgotPasswordCard";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";

import useForgotPassword from "./hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const forgot = useForgotPassword();

  return (
    <AuthBackground>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-20">
        <LoginBranding />

        {!forgot.emailSent ? (
          <ForgotPasswordCard
            email={forgot.email}
            loading={forgot.loading}
            onChange={forgot.handleChange}
            onSubmit={forgot.handleSubmit}
          />
        ) : (
          <ForgotPasswordSuccess
            email={forgot.submittedEmail}
            onTryAgain={forgot.handleTryAgain}
          />
        )}
      </div>
    </AuthBackground>
  );
}
