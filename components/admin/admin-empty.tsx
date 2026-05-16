"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminPrimaryButtonClass } from "@/lib/admin-form-styles";
import { ReactNode } from "react";

interface AdminEmptyProps {
  icon: ReactNode;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaText?: string;
}

export default function AdminEmpty({
  icon,
  title = "Nothing here yet",
  description,
  ctaHref,
  ctaText = "Create",
}: AdminEmptyProps) {
  return (
    <Card className="border-0 p-12 text-center shadow-none">
      <div className="mb-5 flex justify-center">
        <img
          src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778876577/undraw_empty-street_3ogh_thbvrs.svg"
          alt="Empty state illustration"
          className="h-28 w-auto sm:h-32"
        />
      </div>

      {description ? <p className="text-gray-500 mb-6">{description}</p> : null}

      {ctaHref ? (
        <Link href={ctaHref} className={adminPrimaryButtonClass + " p-2"}>
          {ctaText}
        </Link>
      ) : null}
    </Card>
  );
}
