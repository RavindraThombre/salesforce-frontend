import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import MuiProvider from "./theme/MuiThemeProvider";
import { UserProvider } from "./context/UserContext";
import Script from "next/script";
import ClientProviders from "./components/common/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlueCloudMentor | Salesforce Training & Certification",
    template: "%s | BlueCloudMentor",
  },
  description:
    "BlueCloudMentor offers live Salesforce training, certification guidance, real-world projects, and career-focused learning for students and professionals.",
  keywords: [
    "Salesforce training",
    "Salesforce certification",
    "Salesforce training",
    "Salesforce certification",
    "Salesforce admin course",
    "Salesforce developer training",
    "CRM training",
    "BlueCloudMentor",
    "online Salesforce classes",
    "Salesforce career guidance",
    "Salesforce projects",
    "Salesforce learning platform",
    "Salesforce training for students",
    "Salesforce training for professionals",
    "Salesforce training online",
    "bluecloudmentor.com",
    "Salesforce training academy",
    "bluecloudmentor Salesforce training",
  ],
  authors: [{ name: "BlueCloudMentor" }],
  openGraph: {
    title: "BlueCloudMentor | Salesforce Training & Certification",
    description:
      "Live Salesforce classes, certification support, practical projects, and job-ready skills.",
    url: "https://bluecloudmentor.com",
    siteName: "BlueCloudMentor",
    images: [
      {
        url: "/salesforce-academy/logo.png", // place your logo inside /public/logo.png
        width: 1200,
        height: 630,
        alt: "BlueCloudMentor Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueCloudMentor | Salesforce Training & Certification",
    description:
      "Learn Salesforce with live projects, certification prep, and career support.",
    images: ["/salesforce-academy/logo.png"],
  },
  icons: {
    icon: "/salesforce-academy/logo.png",
    shortcut: "/salesforce-academy/logo.png",
    apple: "/salesforce-academy/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <UserProvider>
          <ThemeProvider>
            <MuiProvider>
              <ClientProviders />
              {children}
            </MuiProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
