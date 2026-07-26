export interface ForgotPasswordForm {
  email: string;
}

export type ForgotPasswordPayload = ForgotPasswordForm;

export interface ForgotPasswordResponse {
  message: string;
}
