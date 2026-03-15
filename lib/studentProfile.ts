export interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
}

export function getStudentProfile(): StudentProfile {
  if (typeof window === "undefined") {
    return { name: "", email: "", phone: "", city: "" };
  }

  const data = localStorage.getItem("studentProfile");
  return data
    ? JSON.parse(data)
    : { name: "John Doe", email: "john@example.com", phone: "", city: "" };
}

export function saveStudentProfile(profile: StudentProfile) {
  localStorage.setItem("studentProfile", JSON.stringify(profile));
}
