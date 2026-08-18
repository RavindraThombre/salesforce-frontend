import { Skeleton } from "@/components/ui/skeleton";

export default function CareersLoading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border bg-background"
        >
          <Skeleton className="h-48 w-full rounded-none" />

          <div className="space-y-4 p-6">
            <Skeleton className="h-6 w-2/3" />

            <Skeleton className="h-4 w-1/3" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
