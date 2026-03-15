export type UserRole = "admin" | "student";

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
}

export function loginUser(user: AuthUser) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem("user");
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}
