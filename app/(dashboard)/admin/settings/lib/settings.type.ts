export interface Settings {
  siteName: string;
  supportEmail: string;
  phone: string;

  zoomApiKey: string;
  zoomSecret: string;

  razorpayKey: string;
  stripeKey: string;
}

export interface LastModified {
  updatedAt: string;
  updatedBy: {
    _id: string;
    name: string;
    email: string;
  } | null;
}

export interface SettingsResponse {
  settings: Settings;
  lastModified: LastModified | null;
}
