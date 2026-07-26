export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
}
