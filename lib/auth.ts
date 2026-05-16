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

// Get stored tokens from localStorage
export function getStoredTokens(): AuthToken | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("auth_tokens");
  return stored ? JSON.parse(stored) : null;
}

// Store tokens in localStorage
export function storeTokens(tokens: AuthToken): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_tokens", JSON.stringify(tokens));
}

// Clear stored tokens
export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_tokens");
}

// Login user with email and password
export async function loginAdmin(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string; tokens?: AuthToken }> {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
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

    storeTokens(tokens);
    return { success: true, tokens };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login error",
    };
  }
}

// Verify current token and get user info
export async function verifyToken(
  token: string,
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return { success: false, error: "Token invalid" };
    }

    const data = await response.json();
    return { success: true, user: data.user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Verification error",
    };
  }
}

// Logout user
export function logout(): void {
  clearTokens();
}
