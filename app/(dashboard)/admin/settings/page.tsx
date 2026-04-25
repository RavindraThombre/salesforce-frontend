"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    siteName: "",
    supportEmail: "",
    phone: "",
    zoomApiKey: "",
    zoomSecret: "",
    razorpayKey: "",
    stripeKey: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ FETCH SETTINGS
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get("/settings");
        setForm(res.data);
      } catch {
        toast.error("Failed to load settings ❌");
      }
    };

    fetchSettings();
  }, []);

  // ✅ HANDLE CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE
  const handleSave = async () => {
    try {
      setLoading(true);

      await apiClient.put("/settings", form);

      toast.success("Settings saved ✅");
    } catch {
      toast.error("Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Platform Settings</h1>

      {/* WEBSITE */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Website Settings</h2>

          <Input
            name="siteName"
            value={form.siteName}
            onChange={handleChange}
            placeholder="Website Name"
          />

          <Input
            name="supportEmail"
            value={form.supportEmail}
            onChange={handleChange}
            placeholder="Support Email"
          />

          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

        </CardContent>
      </Card>

      {/* ZOOM */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Zoom Settings</h2>

          <Input
            name="zoomApiKey"
            value={form.zoomApiKey}
            onChange={handleChange}
            placeholder="Zoom API Key"
          />

          <Input
            name="zoomSecret"
            value={form.zoomSecret}
            onChange={handleChange}
            placeholder="Zoom Secret"
          />

        </CardContent>
      </Card>

      {/* PAYMENT */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Payment Settings</h2>

          <Input
            name="razorpayKey"
            value={form.razorpayKey}
            onChange={handleChange}
            placeholder="Razorpay Key"
          />

          <Input
            name="stripeKey"
            value={form.stripeKey}
            onChange={handleChange}
            placeholder="Stripe Key"
          />

        </CardContent>
      </Card>

      {/* SAVE BUTTON */}
      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save All Settings"}
      </Button>

    </div>
  );
}