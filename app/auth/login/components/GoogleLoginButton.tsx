"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

interface GoogleLoginButtonProps {
  loading?: boolean;
  onClick?: () => void;
}

export default function GoogleLoginButton({
  loading = false,
  onClick,
}: GoogleLoginButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="
        w-full
        h-11
        border-white/20
        bg-white/5
        text-white
        hover:bg-white/10
        hover:text-white
      "
      disabled={loading}
      onClick={onClick}
    >
      <Image
        src="/salesforce-academy/google.svg"
        alt="Google"
        width={18}
        height={18}
      />

      <span className="ml-2">Continue with Google</span>
    </Button>
  );
}
