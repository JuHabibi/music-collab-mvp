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
  const heroPoster =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="v" cx="18%" cy="22%" r="70%">
            <stop offset="0%" stop-color="#7b61ff" stop-opacity="0.35"/>
            <stop offset="55%" stop-color="#0b0f1a" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="#060810" stop-opacity="0.95"/>
          </radialGradient>
          <radialGradient id="c" cx="86%" cy="24%" r="75%">
            <stop offset="0%" stop-color="#40d6ff" stop-opacity="0.22"/>
            <stop offset="60%" stop-color="#0b0f1a" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#060810" stop-opacity="0.95"/>
          </radialGradient>
          <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#000" stop-opacity="0.85"/>
            <stop offset="34%" stop-color="#000" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0.78"/>
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="#050714"/>
        <rect width="1600" height="900" fill="url(#v)"/>
        <rect width="1600" height="900" fill="url(#c)"/>
        <rect width="1600" height="900" fill="url(#s)"/>
      </svg>`
    );

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
        {/* mobile: keep it crisp + light (no autoplay video) */}
        <div className="absolute inset-0 sm:hidden" style={{ backgroundImage: `url("${heroPoster}")` }} />

        {/* cinematic video bed (kept subtle + perf-safe) */}
        <video
          className="absolute inset-0 hidden h-full w-full object-cover opacity-[0.46] saturate-125 contrast-110 brightness-90 motion-reduce:hidden sm:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          poster={heroPoster}
        >
          <source src="/hero/collab-musician.mp4" type="video/mp4" />
        </video>

        {/* color wash to keep palette coherence */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_680px_at_12%_18%,rgba(123,97,255,0.20),transparent_60%),radial-gradient(980px_760px_at_88%_22%,rgba(64,214,255,0.16),transparent_62%),linear-gradient(to_bottom,rgba(0,0,0,0.62),rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.62))]" />

        {/* top veil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_22%)]" />

        {/* main atmosphere */}
        <div className="hero-atmo absolute inset-0 opacity-[0.60] bg-[radial-gradient(1100px_760px_at_14%_22%,rgba(123,97,255,0.18),transparent_58%),radial-gradient(900px_700px_at_88%_28%,rgba(64,214,255,0.14),transparent_60%),radial-gradient(760px_460px_at_52%_0%,rgba(255,255,255,0.06),transparent_68%)]" />

        {/* subtle texture (no bitmap, just CSS) */}
        <div className="hero-texture absolute inset-0 opacity-[0.40]" />

        {/* bold motion layers (GPU-friendly transforms) */}
        <div className="hero-orb hero-orb-a absolute -left-40 top-10 h-[520px] w-[520px] rounded-full opacity-[0.45] mix-blend-screen" />
        <div className="hero-orb hero-orb-b absolute -right-44 top-24 h-[560px] w-[560px] rounded-full opacity-[0.45] mix-blend-screen" />
        <div className="hero-scan absolute inset-x-0 top-[-30%] h-[70%] opacity-[0.55]" />

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
              <span className="text-paper-subtle">Search</span> <Kbd>/</Kbd>{" "}
              <span className="text-paper-subtle">“neo-soul · paris”</span>
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

          <p className="text-paper-muted mt-5 max-w-xl text-base leading-relaxed sm:text-[17px]">
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
                className="rounded-2xl border border-white/[0.13] bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <div className="text-xs text-paper-subtle">{i.k}</div>
                <div className="text-paper mt-1 text-sm font-medium">
                  {i.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 md:pl-10">
          <div className="relative">
            <div className="relative pt-2 sm:pr-6">
              <div className="relative rounded-[28px] border border-white/[0.13] bg-black/12 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <HeroArtistCard profile={primaryProfile} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
