import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { createTrainer, updateTrainer } from "../lib/trainerService";
import axios from "axios";

interface Trainer {
  _id: string;
  name: string;
  email: string;
}

interface AddEditTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  trainer?: Trainer | null;
}

const initialForm = {
  name: "",
  email: "",
  password: "",
};

export default function AddEditTrainerDialog({
  open,
  onOpenChange,
  onSuccess,
  trainer,
}: AddEditTrainerDialogProps) {
  const isEdit = Boolean(trainer);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;

    if (trainer) {
      setForm({
        name: trainer.name,
        email: trainer.email,
        password: "",
      });
    } else {
      setForm(initialForm);
    }
  }, [open, trainer]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!isEdit && !form.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      if (isEdit && trainer) {
        await updateTrainer(trainer._id, {
          name: form.name.trim(),
          email: form.email.trim(),
        });

        toast.success("Trainer updated successfully");
      } else {
        await createTrainer({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });

        toast.success("Trainer created successfully");
      }

      setForm(initialForm);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            (isEdit ? "Failed to update trainer" : "Failed to create trainer"),
        );
      } else {
        toast.error(
          isEdit ? "Failed to update trainer" : "Failed to create trainer",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      setForm(initialForm);
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Trainer" : "Create Trainer"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Name</Label>

            <Input
              placeholder="Enter trainer name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="Enter trainer email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>

          {!isEdit && (
            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Trainer"
                : "Create Trainer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
