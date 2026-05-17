import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-2 sm:p-2.5">
      <div className="flex flex-col gap-3 md:grid md:grid-cols-[112px_1fr] md:items-start">
        {/* Image placeholder */}
        <Skeleton className="h-24 w-full rounded-lg bg-black/5 sm:h-32 md:h-full md:min-h-[152px]" />

        <div className="flex h-full flex-col">
          {/* Title skeleton */}
          <Skeleton className="h-4 w-3/4 rounded bg-black/10" />
          <Skeleton className="mt-2 h-4 w-1/2 rounded bg-black/10" />

          {/* Description skeleton */}
          <Skeleton className="mt-3 h-3 w-full rounded bg-black/5" />
          <Skeleton className="mt-1 h-3 w-full rounded bg-black/5" />

          {/* Tag skeleton */}
          <Skeleton className="mt-3 h-5 w-16 rounded-md bg-black/5" />

          {/* Price and button skeleton */}
          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <Skeleton className="h-6 w-20 rounded bg-black/10" />
            <Skeleton className="h-8 w-32 rounded-lg bg-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
