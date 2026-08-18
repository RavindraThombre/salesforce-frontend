"use client";

import { BriefcaseBusiness } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const EmptyApplications = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <BriefcaseBusiness className="h-8 w-8 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">No applications yet</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        You haven&apos;t applied for any jobs yet. Explore our available
        opportunities and find a role that&apos;s right for you.
      </p>

      <Button className="mt-6" onClick={() => router.push("/careers")}>
        Browse Careers
      </Button>
    </div>
  );
};

export default EmptyApplications;
