"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { contactInfo } from "@/lib/contact";

/**
 * Custom hook to fetch the contact phone number from the backend settings.
 * Falls back to the hardcoded contactInfo.phone if fetching fails.
 */
export function useContactPhone() {
  const hero = useSelector((state: RootState) => state.hero);

  const contactPhone = useMemo(
    () => hero.contactPhone || contactInfo.phone,
    [hero.contactPhone],
  );

  const isLoading = hero.status === "loading";
  const error = hero.error ? new Error(hero.error) : null;

  return { contactPhone, isLoading, error };
}
