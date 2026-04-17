import { Card, Container, cn } from "@/components/ui";

const signals = [
  {
    title: "Shared influences",
    desc: "Shared references make it easier to know if the vibe is really there.",
    chips: ["Cleo Sol", "D’Angelo", "Kaytranada"],
    accent: "violet"
  },
  {
    title: "Complementary roles",
    desc: "It’s not just about skill. It’s about finding the role your track actually needs.",
    chips: ["Topline + BGVs", "Live guitar takes", "Mix notes"],
    accent: "cyan"
  },
  {
    title: "Aligned ambition",
    desc: "Find the role your track needs, not just someone who’s “good at X.",
    chips: ["48h feedback", "EP sessions", "Release-ready"],
    accent: "neutral"
  }
];

export function CreativeMatch() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.16]"
      >
        <g
          fill="none"
          strokeWidth="0.5"
          stroke="hsl(114, 4%, 93%)"
          strokeLinecap="square"
        >
          <line x1="362" y1="400" x2="438" y2="400" transform="rotate(0, 400, 400)" opacity="0.17" />
          <line x1="536" y1="400" x2="264" y2="400" transform="rotate(26, 400, 400)" opacity="0.24" />
          <line x1="207.5" y1="400" x2="592.5" y2="400" transform="rotate(52, 400, 400)" opacity="0.80" />
          <line x1="632" y1="400" x2="168" y2="400" transform="rotate(78, 400, 400)" opacity="0.33" />
          <line x1="193" y1="400" x2="607" y2="400" transform="rotate(104, 400, 400)" opacity="0.81" />
          <line x1="268.5" y1="400" x2="531.5" y2="400" transform="rotate(130, 400, 400)" opacity="0.11" />
          <line x1="424" y1="400" x2="376" y2="400" transform="rotate(156, 400, 400)" opacity="0.78" />
          <line x1="273" y1="400" x2="527" y2="400" transform="rotate(182, 400, 400)" opacity="0.44" />
          <line x1="84.5" y1="400" x2="715.5" y2="400" transform="rotate(208, 400, 400)" opacity="0.34" />
          <line x1="716" y1="400" x2="84" y2="400" transform="rotate(234, 400, 400)" opacity="0.24" />
          <line x1="341" y1="400" x2="459" y2="400" transform="rotate(260, 400, 400)" opacity="0.89" />
          <line x1="317" y1="400" x2="483" y2="400" transform="rotate(286, 400, 400)" opacity="0.61" />
          <line x1="56" y1="400" x2="744" y2="400" transform="rotate(312, 400, 400)" opacity="0.51" />
          <line x1="430" y1="400" x2="370" y2="400" transform="rotate(338, 400, 400)" opacity="0.20" />
        </g>
      </svg>

      <Container className="relative">
        <div className="grid items-start gap-10 md:grid-cols-12">
          {/* Left */}
          <div className="md:col-span-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-violet-200/70">
              Creative matching
            </div>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.02]">
              <span className="text-white">More than talent.</span>{" "}
              <span className="bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">
                It’s about creative fit.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/68 sm:text-[15px]">
            Great collaborations need more than talent. They need shared taste, complementary roles, and aligned ambition.
            </p>
          </div>

          {/* Right */}
          <div className="md:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="group relative overflow-hidden border-white/10 bg-white/[0.02] p-6 sm:col-span-2">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_260px_at_20%_20%,rgba(123,97,255,0.18),transparent_60%),radial-gradient(900px_260px_at_80%_80%,rgba(64,214,255,0.12),transparent_60%)]"
                />

                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <div className="text-base font-semibold text-white">
                      Compatibility, not virality
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/68">
                      Discovery is tuned for people you’ll genuinely want to create
                      with — based on sound, intent, and the way you work.
                    </p>
                  </div>

                  <div className="hidden text-right text-xs text-white/50 sm:block">
                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                      influence ↔ workflow ↔ goals
                    </div>
                  </div>
                </div>

                <div className="relative mt-5 grid gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 sm:grid-cols-3">
                  {[
                    { k: "Influences", v: "Shared references" },
                    { k: "Roles", v: "Complementary skills" },
                    { k: "Intent", v: "Aligned ambition" }
                  ].map((i) => (
                    <div key={i.k}>
                      <div className="text-[11px] text-white/50">{i.k}</div>
                      <div className="mt-1 text-xs font-medium text-white/82">
                        {i.v}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {signals.map((s) => (
                <Card
                  key={s.title}
                  className={cn(
                    "group relative overflow-hidden border-white/10 bg-white/[0.02] p-6 transition-all duration-200",
                    "hover:border-white/15 hover:bg-white/[0.03]"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                      s.accent === "violet" &&
                        "bg-[radial-gradient(260px_140px_at_0%_0%,rgba(123,97,255,0.10),transparent_60%)]",
                      s.accent === "cyan" &&
                        "bg-[radial-gradient(260px_140px_at_100%_0%,rgba(64,214,255,0.08),transparent_60%)]"
                    )}
                  />

                  <div className="relative z-10 text-base font-semibold text-white">
                    {s.title}
                  </div>

                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/65">
                    {s.desc}
                  </p>

                  <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/72"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}