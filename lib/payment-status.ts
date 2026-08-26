"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/auth";

/**
 * Queries the backend for live payment/access status.
 * Sole source of truth is backend environment variable (hasPaid in backend .env).
 */
export async function fetchBackendPaymentStatus(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/payment-status`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.hasPaid);
    }
    return false;
  } catch (error) {
    console.error("Failed to query backend payment status:", error);
    return false;
  }
}

/**
 * React hook to verify admin access authorization directly from the backend.
 */
export function usePaymentStatus() {
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function checkStatus() {
      try {
        const backendSettled = await fetchBackendPaymentStatus();
        if (isMounted) {
          setHasPaid(backendSettled);
        }
      } catch {
        if (isMounted) {
          setHasPaid(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }

    void checkStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return { hasPaid, isChecking };
}
