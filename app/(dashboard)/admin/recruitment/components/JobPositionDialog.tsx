import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CompensationCard from "./CompensationCard";
import SkillsCard from "./SkillsCard";
import JobDetailsCard from "./JobDetailsCard";
import DialogActions from "./DialogActions";
import {
  DEFAULT_JOB_POSITION_FORM,
  JobPosition,
  JobPositionFormValues,
} from "../lib/recruitment.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  updateJobPosition,
  createJobPosition,
} from "../lib/recruitmentService";
import BannerUploadCard from "./BannerUploadCard";
import BasicInformationCard from "./BasicInformationCard";

interface JobPositionDialogProps {
  open: boolean;
  job: JobPosition | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JobPositionDialog({
  open,
  job,
  onClose,
  onSuccess,
}: JobPositionDialogProps) {
  const [saving, setSaving] = useState(false);

  const [banner, setBanner] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState<JobPositionFormValues>(
    DEFAULT_JOB_POSITION_FORM,
  );

  useEffect(() => {
    if (!open) {
      resetForm();
      return;
    }

    if (job) {
      setPreview(job.banner);

      const experience =
        typeof job.experience === "string"
          ? JSON.parse(job.experience)
          : job.experience;

      const salary =
        typeof job.salary === "string" ? JSON.parse(job.salary) : job.salary;
      let skills: string[];
      if (typeof job.skills === "string") {
        // Handles old data like '["React","Node"]'
        skills = JSON.parse(job.skills);
      } else {
        skills = job.skills;
        // Handles old data like ['["React","Node"]']
        if (skills.length === 1 && skills[0].startsWith("[")) {
          skills = JSON.parse(skills[0]);
        }
      }

      setForm({
        title: job.title,
        department: job.department,
        employmentType: job.employmentType,
        location: job.location,
        experience,
        salary,
        openings: job.openings,
        skills,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        benefits: job.benefits,
        status: job.status,
      });
    } else {
      resetForm();
    }
  }, [open, job]);

  const resetForm = () => {
    setBanner(null);
    setPreview("");
    setForm(DEFAULT_JOB_POSITION_FORM);
  };
  const validate = () => {
    if (!form.title.trim()) {
      toast.error("Position title is required.");
      return false;
    }

    if (!form.department.trim()) {
      toast.error("Department is required.");
      return false;
    }

    if (!form.location.trim()) {
      toast.error("Location is required.");
      return false;
    }

    if (form.experience.min > form.experience.max) {
      toast.error(
        "Minimum experience cannot be greater than maximum experience.",
      );
      return false;
    }

    if (form.salary.min > form.salary.max) {
      toast.error("Minimum salary cannot be greater than maximum salary.");
      return false;
    }

    return true;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setBanner(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);

      const formData = new FormData();

      if (banner) {
        formData.append("banner", banner);
      }

      formData.append("title", form.title);
      formData.append("department", form.department);
      formData.append("employmentType", form.employmentType);
      formData.append("location", form.location);

      formData.append("experience", JSON.stringify(form.experience));

      formData.append("salary", JSON.stringify(form.salary));

      form.skills.forEach((skill) => {
        formData.append("skills", skill);
      });

      formData.append("openings", String(form.openings));

      formData.append("description", form.description);

      formData.append("responsibilities", form.responsibilities);

      formData.append("requirements", form.requirements);

      formData.append("benefits", form.benefits);

      formData.append("status", form.status);

      if (job) {
        await updateJobPosition(job._id, formData);

        toast.success("Job updated successfully.");
      } else {
        await createJobPosition(formData);

        toast.success("Job created successfully.");
      }

      resetForm();

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resetForm();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-5xl h-[85vh] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>
            {job ? "Update Job Position" : "Create Job Position"}
          </DialogTitle>

          <DialogDescription>
            Create or manage a recruitment position.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <BannerUploadCard
              preview={preview}
              onBannerChange={handleBannerChange}
            />

            <BasicInformationCard
              form={form}
              setForm={setForm}
              onChange={handleChange}
            />

            <CompensationCard form={form} setForm={setForm} />

            <SkillsCard form={form} setForm={setForm} />

            <JobDetailsCard form={form} onChange={handleChange} />
          </div>
        </div>

        {/* Footer */}
        <DialogActions
          saving={saving}
          isEdit={!!job}
          onCancel={() => {
            resetForm();
            onClose();
          }}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}
