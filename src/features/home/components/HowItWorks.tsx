import { IconArrowRight, IconMessage, IconSearch, IconSpark } from "./Icons";
import { Card, Container, cn } from "@/components/ui";

const steps = [
  {
    title: "Show what you bring",
    desc: "Build a profile around your sound, your role, and the kind of sessions you actually want.",
    icon: IconSpark,
    label: "Profile"
  },
  {
    title: "Find real creative fit",
    desc: "Discover musicians by style, role, intent, and chemistry — not just hashtags and vanity stats.",
    icon: IconSearch,
    label: "Discovery"
  },
  {
    title: "Turn a match into real momentum",
    desc: "Start focused conversations, swap ideas, and move naturally toward sessions that lead somewhere.",
    icon: IconMessage,
    label: "Sessions"
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-16 md:py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-violet-200/70">
              How it works
            </div>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.02]">
              <span className="text-white">From profile to real sessions.</span>{" "}
              <span className="bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">
                Clear, focused, and built for momentum.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/68 sm:text-[15px]">
            Vaultune helps artists find the right fit faster and move from discovery to real collaboration without the usual noise.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-sm text-white/50 md:flex">
            <span>Profile</span>
            <IconArrowRight className="h-4 w-4" />
            <span>Discovery</span>
            <IconArrowRight className="h-4 w-4" />
            <span>Sessions</span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, idx) => (
            <Card
              key={s.title}
              className={cn(
                "group relative overflow-hidden border-white/10 bg-white/[0.02] p-6 transition-all duration-200",
                "hover:border-white/15 hover:bg-white/[0.03]"
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <div className="absolute inset-0 bg-[radial-gradient(420px_180px_at_0%_0%,rgba(123,97,255,0.10),transparent_60%),radial-gradient(320px_160px_at_100%_100%,rgba(64,214,255,0.08),transparent_60%)]" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <s.icon className="h-6 w-6 text-white/80" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-white/40 sm:inline-flex">
                    {s.label}
                  </span>
                  <div className="text-xs text-white/35">0{idx + 1}</div>
                </div>
              </div>

              <div className="relative z-10 mt-5 text-lg font-semibold leading-snug text-white">
                {s.title}
              </div>

              <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/65">
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}