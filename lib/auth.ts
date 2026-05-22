// Authentication utilities and constants
// Resolve backend URL using explicit NEXT_PUBLIC_BACKEND_URL when provided.
// Otherwise fall back to per-environment variables for clarity.
const explicit = process.env.NEXT_PUBLIC_BACKEND_URL;
const prod = process.env.NEXT_PUBLIC_PROD_BACKEND_URL;
const dev = process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
export const BACKEND_URL =
  explicit ||
  (process.env.NODE_ENV === "production"
    ? prod || "https://api.example.com"
    : dev || "http://localhost:4000");

export interface AuthToken {
  access_token: string;
  refresh_token: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export function getStoredTokens(): AuthToken | null {
  return null;
}

export function storeTokens(tokens: AuthToken): void {
  void tokens;
}

export function clearTokens(): void {}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string; tokens?: AuthToken }> {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error || "Login failed" };
    }

    const data = await response.json();
    const session = data.session || {};
    const tokens = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    };

    if (!tokens.access_token || !tokens.refresh_token) {
      return {
        success: false,
        error: "Login response did not include valid tokens",
      };
    }

    return { success: true, tokens };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login error",
    };
  }
}

export async function verifyToken(token?: string): Promise<{
  success: boolean;
  user?: AuthUser;
  session?: AuthToken;
  error?: string;
}> {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers,
    });

    if (!response.ok) {
      return { success: false, error: "Token invalid" };
    }

    const data = await response.json();
    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Verification error",
    };
  }
}

export function logout(): void {
  void fetch(`${BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).catch(() => undefined);
}
