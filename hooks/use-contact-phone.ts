"use client";

import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/lib/auth";
import { contactInfo } from "@/lib/contact";

/**
 * Custom hook to fetch the contact phone number from the backend settings.
 * Falls back to the hardcoded contactInfo.phone if fetching fails.
 */
export function useContactPhone() {
  const [contactPhone, setContactPhone] = useState(contactInfo.phone);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BACKEND_URL}/settings/contact_phone`);
        if (res.ok) {
          const data = await res.json();
          setContactPhone(String(data.data.value));
          setError(null);
        } else {
          console.warn("Failed to fetch phone: non-OK response");
          setContactPhone(contactInfo.phone);
        }
      } catch (err) {
        console.error("Failed to fetch contact phone:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        // Fall back to hardcoded phone
        setContactPhone(contactInfo.phone);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhone();
  }, []);

  return { contactPhone, isLoading, error };
}
