export interface Profile {
  name: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  avatar?: string;
}

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  city: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
