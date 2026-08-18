"use client";

import { useEffect, useState } from "react";

import { MyApplication } from "../lib/myApplications.type";
import { getMyApplications } from "../lib/myApplications.service";

import ApplicationCard from "./ApplicationCard";
import EmptyApplications from "./EmptyApplications";
import ApplicationsLoading from "./ApplicationsLoading";

export default function MyApplicationsPageLayout() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyApplications();

      setApplications(response);
    } catch (error) {
      console.error(error);

      setError("Unable to load your applications.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ApplicationsLoading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <p className="font-medium text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>

        <p className="mt-2 text-muted-foreground">
          Track the status of your job applications.
        </p>
      </div>

      {/* Total */}
      <div className="mb-6 rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Total Applications</p>

        <p className="mt-1 text-3xl font-bold">{applications.length}</p>
      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <EmptyApplications />
      ) : (
        /* Applications Grid */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((application) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
}
