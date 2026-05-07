import { IconSearch } from "./Icons";
import { Button, Container, cn } from "@/components/ui";
import { homeH2GradientClass } from "@/features/home/homeHeading";

const bullets = [
  "Stop guessing who might be a fit see shared taste, goals, and momentum up front",
  "Spot real intent early with demos, availability, and clear collaboration signals",
  "Start focused sessions instead of losing weeks in vague messages and dead-end intros",
];

export function RealSessions() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-ink-950" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.045),transparent_22%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_18%_24%,rgba(123,97,255,0.11),transparent_60%),radial-gradient(760px_460px_at_88%_76%,rgba(64,214,255,0.09),transparent_62%)]" />

        {/* Texture */}
        <img
          src="/textures/6536804.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          loading="lazy"
        />

        {/* Dark veil */}
        <div className="absolute inset-0 bg-black/28" />

        {/* subtle top haze */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_280px_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />

        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.22)_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          {/* Left visual */}
          <div className="md:col-span-6">
            <div className="relative flex items-end justify-center overflow-visible">
              {/* diffuse support shape */}
              <div className="absolute inset-x-10 bottom-12 top-12 rounded-[40px] bg-white/[0.015] blur-2xl" />

              {/* glows */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[40%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/12 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute right-8 bottom-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl"
              />

              {/* subtle floor shadow */}
              <div className="absolute bottom-8 left-1/2 h-10 w-[320px] -translate-x-1/2 rounded-full bg-black/40 blur-2xl" />

              {/* snare accent */}
              <img
                src="/snare.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-[-60px] z-[0] w-[260px] rotate-[-18deg] opacity-75 mix-blend-screen drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] md:left-[-40px] md:w-[210px] lg:w-[300px]"
                loading="lazy"
                style={{
                  top: "-333px",
                }}
              />

              {/* subject */}
              <div
                className="absolute z-[1] w-[125%] md:w-[135%] lg:w-[140%]"
                style={{
                  left: "37px",
                  top: "-104px",
                }}
              >
                <img
                  src="/musicien-2-cutout-chrome-2.png"
                  alt="Musicienne au clavier, en session créative."
                  className="h-auto w-full object-contain drop-shadow-[0_32px_70px_rgba(0,0,0,0.45)]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="md:col-span-6 relative z-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-violet-200/75">
              Real collaboration
            </p>

            <h2
              className={cn(
                "mt-3 max-w-[12ch] font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.02]"
              )}
            >
              <span className="text-white">Less scrolling.</span>{" "}
              <span className={homeH2GradientClass}>
                More sessions that spark something real.
              </span>
            </h2>

            <p className="text-paper-muted mt-5 max-w-xl text-[15px] leading-relaxed">
              Find the right people, swap demos, and turn rough ideas into
              tracks that actually deserve to be finished.
            </p>

            <div className="mt-8 space-y-3">
              {bullets.map((b) => (
                <div
                  key={b}
                  className="group flex items-start gap-3 rounded-2xl border border-white/[0.13] bg-white/[0.055] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-white/[0.17] hover:bg-white/[0.075]"
                >
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-violet-300 to-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.18)]" />

                  <p className="text-paper-muted text-sm leading-relaxed">
                    {b}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                href="#discover"
                className="w-full shadow-[0_10px_30px_rgba(255,255,255,0.06)] sm:w-auto"
              >
                Find collaborators
                <IconSearch className="h-4 w-4" />
              </Button>

              <p className="text-sm text-paper-subtle">
                Built for sessions that actually go somewhere.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}