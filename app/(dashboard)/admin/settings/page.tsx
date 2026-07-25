"use client";

import useSettings from "./hooks/useSettings";
import GeneralSettingsCard from "./components/GeneralSettingsCard";
import IntegrationSettingsCard from "./components/IntegrationSettingsCard";
import PaymentSettingsCard from "./components/PaymentSettingsCard";
import SettingsActionBar from "./components/SettingsActionBar";
import SettingsHeader from "./components/SettingsHeader";

export default function AdminSettingsPage() {
  const settings = useSettings();

  return (
    <div className="space-y-6">
      <SettingsHeader saving={settings.saving} onSave={settings.saveSettings} />

      <div className="grid gap-6 lg:grid-cols-2">
        <GeneralSettingsCard
          form={settings.form}
          onChange={settings.handleChange}
        />

        <IntegrationSettingsCard
          form={settings.form}
          onChange={settings.handleChange}
        />
      </div>

      <PaymentSettingsCard
        form={settings.form}
        onChange={settings.handleChange}
      />

      <SettingsActionBar
        saving={settings.saving}
        onSave={settings.saveSettings}
        onReset={settings.fetchSettings}
      />
    </div>
  );
}
