import { IconMessage, IconPin, IconSearch, IconSpark } from "./Icons";
import { Card, Container, cn } from "@/components/ui";

const features = [
  {
    title: "Profiles made for sessions",
    desc: "Instruments, influences, demos, availability — enough signal to know if the groove matches.",
    icon: IconSpark,
    accent: "violet"
  },
  {
    title: "Search by sound, not noise",
    desc: "Filter by genre, instrument, city, remote, and creative goal — like a proper session brief.",
    icon: IconSearch,
    accent: "cyan"
  },
  {
    title: "Collaboration briefs",
    desc: "Post what you need: topline, guitar takes, mix notes — with vibe, timeline, and deliverables.",
    icon: IconPin,
    accent: "amber"
  },
  {
    title: "Private threads that stay focused",
    desc: "Keep the idea, stems, and direction in one calm place — no scattered DMs to lose the thread.",
    icon: IconMessage,
    accent: "neutral"
  }
];

export function Features() {
  return (
    <section id="discover" className="py-16 md:py-20">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-12">
          {/* Left side */}
          <div className="md:col-span-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-violet-200/70">
              What you can do
            </div>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.02]">
              <span className="text-white">Less hunting.</span>{" "}
              <span className="bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">
                More making.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/68 sm:text-[15px]">
              Vaultune is tuned for creator culture: clear intent, fast chemistry,
              cleaner handoffs, and fewer dead-end conversations.
            </p>
          </div>

          {/* Right side */}
          <div className="md:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <Card
                  key={f.title}
                  className={cn(
                    "group relative overflow-hidden border-white/10 bg-white/[0.02] p-6 transition-all duration-200",
                    "hover:border-white/15 hover:bg-white/[0.03]",
                    i === 1 && "sm:-translate-y-2"
                  )}
                >
                  {/* Accent glow */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                      f.accent === "violet" &&
                        "bg-[radial-gradient(300px_140px_at_0%_0%,rgba(123,97,255,0.12),transparent_60%)]",
                      f.accent === "cyan" &&
                        "bg-[radial-gradient(300px_140px_at_100%_0%,rgba(64,214,255,0.10),transparent_60%)]",
                      f.accent === "amber" &&
                        "bg-[radial-gradient(300px_140px_at_50%_100%,rgba(251,191,36,0.08),transparent_60%)]"
                    )}
                  />

                  <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <f.icon className="h-6 w-6 text-white/80" />
                  </div>

                  <div className="relative z-10 mt-5 text-base font-semibold text-white">
                    {f.title}
                  </div>

                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/65">
                    {f.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}