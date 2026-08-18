import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CareersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
      <div className="rounded-full bg-muted p-5">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>

      <h3 className="mt-6 text-2xl font-semibold">No jobs found</h3>

      <p className="mt-2 max-w-md text-muted-foreground">
        We could not find any positions matching your search or filters. Try
        changing the search keywords or selecting a different department.
      </p>

      <Button
        variant="outline"
        className="mt-6"
        onClick={() => window.location.reload()}
      >
        Reset Filters
      </Button>
    </div>
  );
}
