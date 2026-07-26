export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "student";
}

export interface LoginResponse {
  message: string;
  token: string;
  user: LoginUser;
}
