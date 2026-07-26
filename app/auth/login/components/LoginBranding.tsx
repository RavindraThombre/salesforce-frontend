"use client";

import Image from "next/image";
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Video,
} from "lucide-react";

export default function LoginBranding() {
  return (
    <div className="hidden lg:flex flex-1 max-w-xl flex-col justify-center text-white">
      {/* Logo */}
      <div className="mb-8">
        <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 p-4 mt-4 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-400/40">
          <Image
            src="/salesforce-academy/logo.png"
            alt="BlueCloud Mentor"
            width={170}
            height={55}
            priority
          />
        </div>
      </div>

      {/* Heading */}

      <h1 className="text-6xl font-extrabold leading-tight">
        BlueCloud
        <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
          Mentor
        </span>
      </h1>

      <p className="mt-5 max-w-lg text-xl leading-9 text-slate-300">
        Master Salesforce with expert mentorship, live projects,
        industry-recognized certifications, and placement support.
      </p>

      {/* Features */}

      <div className="mt-12 grid grid-cols-2 gap-5">
        <Feature icon={<Video size={22} />} title="Live Classes" />

        <Feature icon={<BookOpen size={22} />} title="Real Projects" />

        <Feature icon={<GraduationCap size={22} />} title="Certificates" />

        <Feature
          icon={<BriefcaseBusiness size={22} />}
          title="Placement Support"
        />
      </div>

      <p className="mt-8 text-sm text-slate-400">
        Trusted by aspiring Salesforce professionals.
      </p>
    </div>
  );
}

interface FeatureProps {
  title: string;
  icon: React.ReactNode;
}

function Feature({ title, icon }: FeatureProps) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-5
        py-4
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-cyan-400/40
        hover:bg-cyan-400/10
        hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-cyan-500/20
          text-cyan-300
          transition-transform
          duration-300
          group-hover:rotate-6
          group-hover:scale-110
        "
      >
        {icon}
      </div>

      <span className="font-medium text-slate-100">{title}</span>
    </div>
  );
}
