import { BriefcaseBusiness, Users, Rocket, MapPin } from "lucide-react";

export default function CareersHero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Careers at Blue Cloud Mentor
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Build Your Future With Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Join a passionate team building innovative learning experiences.
            Explore opportunities where your skills can make a real impact.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Rocket className="mx-auto mb-3 h-8 w-8 text-blue-400" />
              <h3 className="font-semibold">Career Growth</h3>
              <p className="mt-2 text-sm text-slate-300">
                Learn, innovate and grow with challenging projects.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Users className="mx-auto mb-3 h-8 w-8 text-green-400" />
              <h3 className="font-semibold">Great Team</h3>
              <p className="mt-2 text-sm text-slate-300">
                Work alongside talented professionals and mentors.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <MapPin className="mx-auto mb-3 h-8 w-8 text-orange-400" />
              <h3 className="font-semibold">Flexible Workplace</h3>
              <p className="mt-2 text-sm text-slate-300">
                Onsite, remote and hybrid opportunities available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
