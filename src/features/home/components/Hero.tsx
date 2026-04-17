import { Badge, Button, Container, Kbd, cn } from "@/components/ui";
import {
  IconArrowRight,
  IconBolt,
  IconSearch,
} from "@/features/home/components/Icons";
import { HeroArtistCard, type ArtistProfile } from "./HeroArtistCard";

const primaryProfile: ArtistProfile = {
  name: "Mina R.",
  role: "Vocalist • Neo-Soul / Alt-R&B",
  location: "Paris",
  matchPct: 92,
  influences: ["Kaytranada", "FKJ"],
  vibe: "Same late-night groove",
  goal: "Release-ready EP sessions",
  availability: "Available now",
  accent: "violet",
};

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative isolate min-h-screen overflow-hidden bg-ink-950"
    >
      {/* Solid base + rich atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* top veil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_22%)]" />

        {/* main atmosphere */}
        <div className="hero-atmo absolute inset-0 bg-[radial-gradient(1100px_760px_at_14%_22%,rgba(123,97,255,0.18),transparent_58%),radial-gradient(900px_700px_at_88%_28%,rgba(64,214,255,0.14),transparent_60%),radial-gradient(760px_460px_at_52%_0%,rgba(255,255,255,0.06),transparent_68%)]" />

        {/* subtle texture (no bitmap, just CSS) */}
        <div className="hero-texture absolute inset-0" />

        {/* bold motion layers (GPU-friendly transforms) */}
        <div className="hero-orb hero-orb-a absolute -left-40 top-10 h-[520px] w-[520px] rounded-full" />
        <div className="hero-orb hero-orb-b absolute -right-44 top-24 h-[560px] w-[560px] rounded-full" />
        <div className="hero-scan absolute inset-x-0 top-[-30%] h-[70%]" />

        {/* left dramatic glow */}
        <div className="absolute left-[-260px] top-[110px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(123,97,255,0.22),transparent_66%)] blur-3xl" />

        {/* right accent glow */}
        <div className="absolute right-[-240px] top-[150px] h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle_at_center,rgba(64,214,255,0.16),transparent_64%)] blur-3xl" />

        {/* center bloom */}
        <div className="absolute left-1/2 top-[-40px] h-[320px] w-[760px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_72%)] blur-2xl" />

        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.24)_100%)]" />

        {/* local bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent" />
      </div>

      <Container className="relative z-10 grid min-h-screen items-center gap-12 pb-16 pt-16 md:grid-cols-12 md:pb-20 md:pt-24">
        <div className="md:col-span-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              <IconBolt className="h-4 w-4 text-white/70" />
              Creative matching for serious collaborators
            </Badge>

            <Badge className="hidden sm:inline-flex">
              <span className="text-white/60">Search</span> <Kbd>/</Kbd>{" "}
              <span className="text-white/60">“neo-soul · paris”</span>
            </Badge>
          </div>

          <h1
            className={cn(
              "mt-6 font-[var(--font-display)] text-[44px] leading-[1.02] tracking-tight text-white",
              "sm:text-[56px] md:text-[64px]",
            )}
          >
            Find collaborators who match your sound.
            <span className="block bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">
              Not just your genre.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-[17px]">
            Discover artists by vibe, influences, intent, and availability. Then start focused sessions with people who actually fit the way you
            create.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#join" className="w-full sm:w-auto">
            Find collaborators
              <IconArrowRight className="h-4 w-4" />
            </Button>

            <Button
              href="#discover"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Explore profiles
              <IconSearch className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { k: "Better fit →", v: "Shared influences and aligned goals" },
              { k: "Clear intent", v: "Know who’s available and ready" },
              {
                k: "Real momentum",
                v: "Start focused sessions, not dead-end chats",
              },
            ].map((i) => (
              <div
                key={i.k}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="text-xs text-white/55">{i.k}</div>
                <div className="mt-1 text-sm font-medium text-white/85">
                  {i.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 md:pl-10">
          <div className="relative">
            <div className="relative pt-2 sm:pr-6">
              <div className="relative rounded-[28px] border border-white/10 bg-black/10 p-2">
                <HeroArtistCard profile={primaryProfile} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
