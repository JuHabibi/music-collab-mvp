import type { Metadata } from "next";

import { Badge, Button, Card, Container, cn } from "@/components/ui";
import { AmbientBackground } from "@/features/home/components/Background";
import { Footer } from "@/components/Footer";
import { ServerHeader } from "@/components/ServerHeader";

export const metadata: Metadata = {
  title: "Discover — Vaultune",
  description:
    "Browse musicians by vibe, role, genre, location and creative goals — UI preview only."
};

type ArtistAccent = "violet" | "cyan" | "amber" | "rose";

type Artist = {
  name: string;
  slug: string;
  city: string;
  role: string;
  genres: string[];
  intent: string;
  remote?: boolean;
  accent: ArtistAccent;
};

const artists: Artist[] = [
  {
    name: "Mina R.",
    slug: "mina-r",
    city: "Paris",
    role: "Vocalist",
    genres: ["Neo‑soul", "Alt‑R&B"],
    intent: "Looking for warm toplines + stacked harmonies for an EP.",
    remote: true,
    accent: "violet"
  },
  {
    name: "Solène G.",
    slug: "solene-g",
    city: "Lyon",
    role: "Guitarist",
    genres: ["Funk", "Live sessions"],
    intent: "Tight pocket + tasteful fills for a live recording day.",
    accent: "amber"
  },
  {
    name: "Kaito V.",
    slug: "kaito-v",
    city: "Berlin",
    role: "Producer",
    genres: ["Electronic", "Textures"],
    intent: "Seeking vocal hooks with direction — stems + notes, no chaos.",
    remote: true,
    accent: "cyan"
  },
  {
    name: "Noah D.",
    slug: "noah-d",
    city: "London",
    role: "Bassist",
    genres: ["House", "Disco‑leaning"],
    intent: "Available for groove-first sessions and release-ready takes.",
    accent: "rose"
  },
  {
    name: "Aya K.",
    slug: "aya-k",
    city: "Marseille",
    role: "Singer‑songwriter",
    genres: ["Indie", "Dream pop"],
    intent: "Co-writing melodies with a clear emotional arc and references.",
    remote: true,
    accent: "violet"
  },
  {
    name: "Leo M.",
    slug: "leo-m",
    city: "Brussels",
    role: "Beatmaker",
    genres: ["Hip‑hop", "UK rap"],
    intent: "Wants crisp toplines — send a demo, get a structured reply.",
    accent: "cyan"
  }
];

const accentCover: Record<ArtistAccent, string> = {
  violet:
    "bg-[radial-gradient(120px_120px_at_20%_25%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(160px_160px_at_85%_70%,rgba(123,97,255,0.28),transparent_62%),linear-gradient(135deg,rgba(123,97,255,0.16),rgba(255,255,255,0.05))]",
  cyan: "bg-[radial-gradient(120px_120px_at_22%_28%,rgba(255,255,255,0.16),transparent_60%),radial-gradient(160px_160px_at_82%_72%,rgba(64,214,255,0.22),transparent_62%),linear-gradient(135deg,rgba(64,214,255,0.12),rgba(255,255,255,0.05))]",
  amber:
    "bg-[radial-gradient(120px_120px_at_22%_28%,rgba(255,255,255,0.14),transparent_60%),radial-gradient(160px_160px_at_82%_72%,rgba(251,191,36,0.20),transparent_62%),linear-gradient(135deg,rgba(251,191,36,0.10),rgba(255,255,255,0.05))]",
  rose: "bg-[radial-gradient(120px_120px_at_22%_28%,rgba(255,255,255,0.14),transparent_60%),radial-gradient(160px_160px_at_82%_72%,rgba(244,114,182,0.18),transparent_62%),linear-gradient(135deg,rgba(244,114,182,0.10),rgba(255,255,255,0.05))]"
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArtistCard({ a }: { a: Artist }) {
  const initials = a.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="relative aspect-[4/3]">
          <div className={cn("absolute inset-0", accentCover[a.accent])} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-sm font-semibold text-white/90 backdrop-blur">
              {initials}
            </div>
            {a.remote ? (
              <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/75 backdrop-blur">
                Remote
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-white">{a.name}</div>
              <div className="mt-1 text-sm text-white/65">
                {a.role} <span className="text-white/35">·</span> {a.city}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {a.genres.slice(0, 3).map((g) => (
              <Badge key={g} className="bg-white/[0.02] text-white/75">
                {g}
              </Badge>
            ))}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/70">{a.intent}</p>

          <div className="mt-6">
            <Button href={`/artist/${a.slug}`} variant="secondary" className="w-full">
              View profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function DiscoverPage() {
  const summary = `${artists.length} artists found`;

  return (
    <main className="relative">
      <AmbientBackground />
      <ServerHeader />

      <section className="relative overflow-hidden border-b border-white/5">
        <div
          className="pointer-events-none absolute inset-0 bg-[url('/collaborator-2.jpg')] bg-cover bg-[center_20%] sm:bg-[center_30%] lg:bg-right"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/93 to-ink-950/50"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent"
          aria-hidden="true"
        />
        <Container className="relative py-14 md:py-16">
          <div className="max-w-3xl">
            <div className="text-xs font-medium tracking-wide text-white/55">
              Discover
            </div>
            <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl">
              Find collaborators
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-[17px]">
              Browse musicians by vibe, role, genre, location and creative goals —
              then open a profile when something feels right.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container className="py-10 md:py-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-12">
              <label className="text-xs font-medium tracking-wide text-white/55">
                Search
              </label>
              <div className="mt-2">
                <input
                  placeholder="Search vocalists, producers, guitarists..."
                  className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/20"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Role", value: "Any" },
                { label: "Genre", value: "Neo‑soul" },
                { label: "City", value: "Paris" },
                { label: "Remote", value: "Only" }
              ].map((f) => (
                <button
                  key={f.label}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.05]"
                >
                  <span className="text-white/55">{f.label}</span>
                  <span className="text-white">{f.value}</span>
                  <ChevronDown className="h-4 w-4 text-white/45" />
                </button>
              ))}
            </div>

            <div className="text-sm text-white/60">{summary}</div>
          </div>

          <div className="mt-3 text-sm text-white/55">
            Showing producers, vocalists and guitarists
          </div>
        </Container>
      </section>

      <section className="relative pb-16 md:pb-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {artists.map((a) => (
              <ArtistCard key={a.name} a={a} />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}