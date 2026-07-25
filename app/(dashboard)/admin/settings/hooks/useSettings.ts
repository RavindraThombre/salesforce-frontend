"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { LastModified, Settings } from "../lib/settings.type";
import { getSettings, updateSettings } from "../lib/settingsService";

const initialForm: Settings = {
  siteName: "",
  supportEmail: "",
  phone: "",

  zoomApiKey: "",
  zoomSecret: "",

  razorpayKey: "",
  stripeKey: "",
};

export default function useSettings() {
  const [form, setForm] = useState<Settings>(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastModified, setLastModified] = useState<LastModified | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getSettings();

      setForm({
        ...initialForm,
        ...data.settings,
      });
      setLastModified(data.lastModified);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to load settings.",
        );
      } else {
        toast.error("Failed to load settings.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveSettings = async () => {
    try {
      setSaving(true);

      const data = await updateSettings(form);
      setForm({
        ...initialForm,
        ...data.settings,
      });

      setLastModified(data.lastModified);

      toast.success("Settings updated successfully.");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to update settings.",
        );
      } else {
        toast.error("Failed to update settings.");
      }
    } finally {
      setSaving(false);
    }
  };

  return {
    form,

    loading,
    saving,

    lastModified,

    handleChange,

    fetchSettings,
    saveSettings,
  };
}
