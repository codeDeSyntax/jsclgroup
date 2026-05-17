/**
 * Server-side configuration helpers.
 * Use this for server-side fetches in RSCs (React Server Components).
 * For client-side code, use lib/auth.ts instead.
 */

export function getBackendUrl(): string {
  // On server-side, read from environment directly (not NEXT_PUBLIC_)
  // Fallback to NEXT_PUBLIC_ variables if available
  const prod = process.env.NEXT_PUBLIC_PROD_BACKEND_URL;
  const dev = process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

  if (process.env.NODE_ENV === "production") {
    return prod || "https://api.example.com";
  }
  return dev || "http://localhost:4000";
}
