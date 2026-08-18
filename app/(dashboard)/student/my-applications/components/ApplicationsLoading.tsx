import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationsLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-xl border p-6">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between gap-4">
              <div className="space-y-3">
                <Skeleton className="h-6 w-56" />

                <div className="flex gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              <Skeleton className="h-6 w-24" />
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
