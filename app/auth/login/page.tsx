"use client";

import AuthBackground from "./components/AuthBackground";
import LoginBranding from "./components/LoginBranding";
import LoginCard from "./components/LoginCard";

import useLogin from "./hooks/useLogin";

export default function LoginPage() {
  const login = useLogin();

  return (
    <AuthBackground>
      <div className="flex w-full max-w-7xl items-center justify-between gap-20">
        <LoginBranding />

        <LoginCard
          form={login.form}
          loading={login.loading}
          onChange={login.handleChange}
          onSubmit={login.handleSubmit}
        />
      </div>
    </AuthBackground>
  );
}
