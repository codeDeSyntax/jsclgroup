import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
      <div>
        {/* Image wrapper placeholder */}
        <Skeleton className="relative aspect-square w-full rounded-xl bg-slate-50" />

        {/* Text content placeholders */}
        <div className="mt-4 flex flex-col gap-2">
          {/* Category/Tag skeleton */}
          <Skeleton className="h-3 w-16 rounded bg-slate-100" />
          
          {/* Title skeleton */}
          <Skeleton className="h-4 w-3/4 rounded bg-slate-200" />
          
          {/* Description skeleton */}
          <Skeleton className="mt-1 h-3 w-full rounded bg-slate-100" />
          <Skeleton className="h-3 w-5/6 rounded bg-slate-100" />
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-50 pt-3">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-2.5 w-8 rounded bg-slate-100" />
          <Skeleton className="h-5 w-16 rounded bg-slate-200" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
