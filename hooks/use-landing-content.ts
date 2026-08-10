"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLandingContent } from "@/store/landingContentSlice";

export function useLandingContent() {
  const dispatch = useAppDispatch();
  const landingState = useAppSelector((state) => state.landingContent);

  useEffect(() => {
    // Automatically dispatches fetch thunk if cache is stale (>10 mins) or empty
    void dispatch(fetchLandingContent());
  }, [dispatch]);

  return landingState;
}
