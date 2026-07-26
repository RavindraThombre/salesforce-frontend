export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}
