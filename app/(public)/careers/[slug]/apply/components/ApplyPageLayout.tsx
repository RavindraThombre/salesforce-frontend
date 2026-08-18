"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CareerJob } from "../../../lib/careers.types";
import { getPublishedJobBySlug } from "../../../lib/careers.service";

import CareersLoading from "../../../components/CareersLoading";

import ApplicantInformationCard from "./ApplicantInformationCard";
import ResumeUploadCard from "./ResumeUploadCard";
import CoverLetterCard from "./CoverLetterCard";
import ApplyFooter from "./ApplyFooter";
import { useUser } from "@/app/context/UserContext";
import { submitJobApplication } from "../lib/apply.service";
import { toast } from "sonner";

interface ApplyPageLayoutProps {
  slug: string;
}

export default function ApplyPageLayout({ slug }: ApplyPageLayoutProps) {
  const router = useRouter();
  const { user } = useUser();

  const [phone, setPhone] = useState(user?.phone ?? "");
  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<CareerJob | null>(null);
  const [error, setError] = useState("");

  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    if (user?.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    fetchJob();
  }, [slug]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPublishedJobBySlug(slug);

      setJob(response);
    } catch (error) {
      console.error(error);

      setError("Job not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!job) {
      toast.error("Job not found.");
      return;
    }

    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    if (!user?.phone && !phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    try {
      setSubmitting(true);

      await submitJobApplication({
        jobId: job._id,
        phone: user?.phone?.trim() || phone.trim(),
        coverLetter,
        resume,
      });

      toast.success("Application submitted successfully.");

      router.push("/student/my-applications");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <CareersLoading />;
  }

  if (!job || error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Job Not Found</h2>

        <p className="mt-2 text-muted-foreground">
          The requested job could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Apply for {job.title}</h1>

        <p className="mt-2 text-muted-foreground">
          Complete your application to join our team.
        </p>
      </div>

      <div className="space-y-6">
        <ApplicantInformationCard phone={phone} onPhoneChange={setPhone} />

        <ResumeUploadCard resume={resume} onChange={setResume} />

        <CoverLetterCard value={coverLetter} onChange={setCoverLetter} />

        <ApplyFooter
          submitting={submitting}
          onCancel={() => router.back()}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
