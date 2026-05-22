"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { fetchContactPhone } from "@/store/heroSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Dispatch once on client mount to populate contact phone centrally
    store.dispatch(fetchContactPhone() as any);
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
