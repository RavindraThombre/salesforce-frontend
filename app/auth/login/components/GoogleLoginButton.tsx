"use client";

import { GoogleLogin } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  loading?: boolean;
  onSuccess: (credential: string) => void;
}

export default function GoogleLoginButton({
  loading = false,
  onSuccess,
}: GoogleLoginButtonProps) {
  return (
    <div
      className={`flex w-full justify-center ${
        loading ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse.credential) {
            return;
          }

          onSuccess(credentialResponse.credential);
        }}
        onError={() => {
          console.error("Google authentication failed");
        }}
        theme="filled_black"
        size="large"
        width="384"
        text="continue_with"
      />
    </div>
  );
}
