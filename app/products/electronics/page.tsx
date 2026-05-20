import { Suspense } from "react";
import ElectronicsPageClient from "./_client";

export default function ElectronicsPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-jcl-white" />}>
      <ElectronicsPageClient />
    </Suspense>
  );
}
