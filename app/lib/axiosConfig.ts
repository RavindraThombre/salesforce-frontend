import axios from "axios";
import { appSettings } from "./site";
import { toast } from "sonner";

export const apiClient = axios.create({
    baseURL: `${appSettings.links.api_base_url}/api/sf/v1/`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': appSettings.keys.default_api_key,
    }
});


// 🔥 1. REQUEST INTERCEPTOR (ADD TOKEN)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


// 🔥 2. RESPONSE INTERCEPTOR (REPLACE OLD ONE)
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong";

    toast.error(message);

    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {

        // 🔥 STOP INFINITE LOOP
        if (window.location.pathname.includes("/auth/login")) {
          return Promise.reject(error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href =
          `${window.location.origin}/salesforce-academy/auth/login`;
      }
    }

    return Promise.reject(error);
  }
);


// apiClient.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     const message =
//       error?.response?.data?.message || "Something went wrong";

//     toast.error(message);

//     // 🔥 HANDLE UNAUTHORIZED CLEANLY
//     if (error?.response?.status === 401) {
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         // prevent infinite redirect loop
//         if (!window.location.pathname.includes("/auth/login")) {
//           window.location.href = `${window.location.origin}/salesforce-academy/auth/login`;
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );
// apiClient.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     const message =
//       error?.response?.data?.message || "Something went wrong";

//     toast.error(message);
//     if (error?.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/auth/login";
//     }

//     return Promise.reject(error);
//   }
// );

export const authClient = axios.create({
    baseURL: `${appSettings.links.auth_base_url}/api/ac/v1/`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': appSettings.keys.default_api_key,
    }
});

