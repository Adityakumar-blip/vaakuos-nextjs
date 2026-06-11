import { apiClient } from "@/lib/api-client";

export interface User {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  tenantId?: string;
  tenantType?: "agency" | "business";
  type?: "agency" | "business";
  roles: string[];
  permissions: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  companyName: string;
  type: "agency" | "business";
}

export interface AuthResponse {
  user: User;
  access_token: string;
  exchange_token?: string;
  refreshToken?: string;
}

function markAuthenticated(token?: string) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("is_authenticated", "true");
    localStorage.setItem("auth_token", token);
  }
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", credentials);
    markAuthenticated(data.access_token);
    return data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/register", userData);
    markAuthenticated(data.access_token);
    return data;
  },

  googleLogin: async (token: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/google", { token });
    markAuthenticated(data.access_token);
    return data;
  },

  /** Sends a one-time code to the given phone number over WhatsApp. */
  whatsappRequestOtp: async (phone: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>("/auth/whatsapp/request-otp", {
      phone,
    });
    return data;
  },

  /** Verifies the WhatsApp OTP and signs the user in. */
  whatsappVerifyOtp: async (phone: string, code: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/whatsapp/verify-otp", {
      phone,
      code,
    });
    markAuthenticated(data.access_token);
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("is_authenticated");
        localStorage.removeItem("auth_token");
      }
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get<User>("/auth/me");
    return data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>("/auth/forgot-password", { email });
    return data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>("/auth/reset-password", {
      token,
      newPassword,
    });
    return data;
  },

  checkSession: async (): Promise<boolean> => {
    try {
      await apiClient.get("/auth/me");
      if (typeof window !== "undefined") localStorage.setItem("is_authenticated", "true");
      return true;
    } catch (error: any) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("is_authenticated");
          localStorage.removeItem("auth_token");
        }
      }
      return false;
    }
  },
};

/**
 * Mirrors the redirect target used by the original landing app: local dev
 * goes to the local app, everything else to the hosted dashboard.
 */
export function getAppUrl(): string {
  if (typeof window === "undefined") return "https://app.vaakuos.com";
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "vaakuos.local";
  return isLocal ? "http://vaakuos.local:8081" : "https://app.vaakuos.com";
}
