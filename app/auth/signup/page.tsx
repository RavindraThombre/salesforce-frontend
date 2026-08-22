"use client";

import AuthBackground from "../login/components/AuthBackground";
import LoginBranding from "../login/components/LoginBranding";

import SignupCard from "./components/SignupCard";
import useSignup from "./hooks/useSignup";

export default function SignupPage() {
  const signup = useSignup();

  return (
    <AuthBackground>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-20">
        <LoginBranding />

        <SignupCard
          form={signup.form}
          loading={signup.loading}
          onChange={signup.handleChange}
          onSubmit={signup.handleSubmit}
          onGoogleSignup={signup.handleGoogleSignup}
        />
      </div>
    </AuthBackground>
  );
}
