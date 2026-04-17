import type { Metadata } from "next";

import { Badge, Button, Card, Container, cn } from "@/components/ui";
import { AmbientBackground } from "@/features/home/components/Background";
import { Footer } from "@/features/home/components/Footer";
import { Header } from "@/features/home/components/Header";

type ArtistAccent = "violet" | "cyan" | "amber" | "rose";

type ArtistProfile = {
  slug: string;
  name: string;
  role: string;
  city: string;
  availability: "Available" | "Limited" | "Booked";
  remote?: boolean;
  accent: ArtistAccent;
  bio: string;
  profileSummary: string;
  collaborationStyle: string;
  influences: string[];
  lookingFor: {
    title: string;
    description: string;
  }[];
  skills: string[];
  strengths: string[];
  demos: { title: string; note: string; length: string }[];
  testimonials?: { quote: string; name: string; context: string }[];
};

const accentCover: Record<ArtistAccent, string> = {
  violet:
    "bg-[radial-gradient(120px_120px_at_18%_22%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(220px_220px_at_86%_72%,rgba(123,97,255,0.26),transparent_62%),linear-gradient(135deg,rgba(123,97,255,0.16),rgba(255,255,255,0.05))]",
  cyan:
    "bg-[radial-gradient(120px_120px_at_18%_22%,rgba(255,255,255,0.16),transparent_60%),radial-gradient(220px_220px_at_86%_72%,rgba(64,214,255,0.22),transparent_62%),linear-gradient(135deg,rgba(64,214,255,0.12),rgba(255,255,255,0.05))]",
  amber:
    "bg-[radial-gradient(120px_120px_at_18%_22%,rgba(255,255,255,0.14),transparent_60%),radial-gradient(220px_220px_at_86%_72%,rgba(251,191,36,0.20),transparent_62%),linear-gradient(135deg,rgba(251,191,36,0.10),rgba(255,255,255,0.05))]",
  rose:
    "bg-[radial-gradient(120px_120px_at_18%_22%,rgba(255,255,255,0.14),transparent_60%),radial-gradient(220px_220px_at_86%_72%,rgba(244,114,182,0.18),transparent_62%),linear-gradient(135deg,rgba(244,114,182,0.10),rgba(255,255,255,0.05))]"
};

const PROFILES: ArtistProfile[] = [
  {
    slug: "mina-r",
    name: "Mina R.",
    role: "Vocalist",
    city: "Paris",
    availability: "Available",
    remote: true,
    accent: "violet",
    profileSummary:
      "Warm, intimate toplines with a producer’s mindset clear references, clean stems, and space for real emotion.",
    bio: "I like sessions that are focused, musical, and easy to build on. I write quickly, keep notes structured, and care a lot about harmony choices, restraint, and hook clarity. I’m at my best when the direction is strong but there’s still room for instinct.",
    collaborationStyle:
      "Fast iterations, calm workflow, thoughtful feedback, and strong attention to arrangement.",
    influences: ["Kaytranada", "FKJ", "Tom Misch", "Jungle", "Sade", "Erykah Badu"],
    lookingFor: [
      {
        title: "Neo-soul / alt-R&B EP",
        description:
          "4–6 tracks with a clear palette, vocal space, and enough room to shape hooks properly."
      },
      {
        title: "House-leaning edits",
        description:
          "Danceable grooves with strong toplines, clean structure, and release-ready direction."
      },
      {
        title: "Live session day",
        description:
          "Minimal setup, tight communication, and musicians who can move fast without overplaying."
      }
    ],
    skills: ["Toplines", "Harmonies", "Ad-libs", "Vocal comping"],
    strengths: ["Tasteful restraint", "Hook clarity", "Fast iteration", "Great with feedback"],
    demos: [
      { title: "Velvet Hours", note: "Topline + harmonies · 112 BPM", length: "1:12" },
      { title: "Afterglow", note: "Hook sketch · dry vocal", length: "0:48" },
      { title: "Night Bus", note: "Chorus concept · stacked layers", length: "1:03" }
    ],
    testimonials: [
      {
        quote:
          "Mina delivers takes that already sound arranged. The harmonies are always musical, never crowded.",
        name: "Kaito V.",
        context: "Producer · Berlin"
      },
      {
        quote:
          "Super structured session — references, notes, stems. Everything was easy to slot into the mix.",
        name: "Solène G.",
        context: "Guitarist · Lyon"
      }
    ]
  },
  {
    slug: "kaito-v",
    name: "Kaito V.",
    role: "Producer",
    city: "Berlin",
    availability: "Limited",
    remote: true,
    accent: "cyan",
    profileSummary:
      "Textural electronic producer with a love for groove, negative space, and arrangement that feels intentional.",
    bio: "I’m collaborative about direction, but I care a lot about structure, pacing, and sonic clarity. I like working with artists who bring references, taste, and a sense of what the track should become. Good sessions are usually the ones with less noise and better decisions.",
    collaborationStyle:
      "Clear structure first, clean stems, strong references, and room for live elements to add tension.",
    influences: ["Floating Points", "Bonobo", "Jamie xx", "Caribou", "Burial"],
    lookingFor: [
      {
        title: "Directed vocal hooks",
        description:
          "Writers or singers who can bring memorable toplines without making the arrangement overcrowded."
      },
      {
        title: "Live textures to resample",
        description:
          "Guitar, keys, or unusual recordings that can add movement and depth to electronic tracks."
      },
      {
        title: "Mix-ready bass takes",
        description:
          "Tight performances with confident pocket and enough consistency to drop straight into production."
      }
    ],
    skills: ["Production", "Arrangement", "Sound design", "Mix prep"],
    strengths: ["Structure first", "Clean stems", "Ear for space", "Release-ready polish"],
    demos: [
      { title: "Glassline", note: "Texture study · 124 BPM", length: "1:05" },
      { title: "Orbits", note: "Groove loop · drums + bass", length: "0:52" }
    ]
  }
];

function getProfile(slug: string): ArtistProfile {
  return (
    PROFILES.find((p) => p.slug === slug) ?? {
      slug,
      name: "Artist profile",
      role: "Creator",
      city: "—",
      availability: "Available",
      remote: true,
      accent: "violet",
      profileSummary:
        "A focused creative profile built for serious collaboration and clear artistic direction.",
      bio: "This profile preview highlights taste, workflow, influences, and what someone is looking for right now.",
      collaborationStyle:
        "Clear communication, strong references, and enough flexibility to build something that feels intentional.",
      influences: ["Kaytranada", "FKJ", "Tom Misch", "Jungle"],
      lookingFor: [
        {
          title: "A clear brief",
          description: "References, goals, and enough direction to move quickly."
        },
        {
          title: "Good communication",
          description: "Fast feedback, aligned expectations, and respect for the process."
        },
        {
          title: "Tasteful collaborations",
          description: "People who care about tone, detail, and finishing strong."
        }
      ],
      skills: ["Songwriting", "Performance"],
      strengths: ["Taste", "Consistency"],
      demos: [{ title: "Untitled sketch", note: "Selected demo · rough preview", length: "0:45" }]
    }
  );
}

function availabilityTone(a: ArtistProfile["availability"]) {
  if (a === "Available") {
    return "text-emerald-200/90 border-emerald-200/15 bg-emerald-200/[0.06]";
  }
  if (a === "Limited") {
    return "text-amber-200/90 border-amber-200/15 bg-amber-200/[0.06]";
  }
  return "text-rose-200/90 border-rose-200/15 bg-rose-200/[0.06]";
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfile(slug);

  return {
    title: `${profile.name} — Vaultune`,
    description: `Artist profile for ${profile.name} on Vaultune.`
  };
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 8.6v6.8c0 .6.7 1 1.2.7l6-3.4c.6-.3.6-1.1 0-1.4l-6-3.4c-.5-.3-1.2.1-1.2.7z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 21a9 9 0 110-18 9 9 0 010 18z"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs font-medium tracking-wide text-white/55">{eyebrow}</div>
      <h2 className="mt-3 font-[var(--font-display)] text-2xl tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default async function ArtistProfilePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfile(slug);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="relative">
      <AmbientBackground />
      <Header />

      <section className="relative overflow-hidden border-b border-white/5">
        <div
          className="pointer-events-none absolute inset-0 bg-[url('/collaborator-2.jpg')] bg-cover bg-[center_20%] sm:bg-[center_30%] lg:bg-right"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/55"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent"
          aria-hidden="true"
        />

        <Container className="relative py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={cn("border", availabilityTone(profile.availability))}>
                  {profile.availability}
                </Badge>
                {profile.remote ? (
                  <Badge className="bg-white/[0.02] text-white/75">Remote friendly</Badge>
                ) : null}
                <Badge className="bg-white/[0.02] text-white/75">{profile.city}</Badge>
              </div>

              <h1 className="mt-4 font-[var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl">
                {profile.name}
              </h1>

              <p className="mt-3 text-base text-white/70 sm:text-[17px]">
                {profile.role} <span className="text-white/35">·</span> {profile.city}
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-[15px]">
                {profile.profileSummary}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#" className="sm:w-auto">
                  Message
                </Button>
                <Button href="#" variant="secondary" className="sm:w-auto">
                  Invite to collaborate
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {profile.strengths.slice(0, 4).map((s) => (
                  <Badge key={s} className="bg-white/[0.02] text-white/75">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="overflow-hidden border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
                <div className="relative aspect-[5/4]">
                  <div className={cn("absolute inset-0", accentCover[profile.accent])} />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.10),transparent_55%),linear-gradient(to_top,rgba(3,7,18,0.78),transparent)]"
                    aria-hidden="true"
                  />

                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-sm font-semibold text-white/90 backdrop-blur">
                      {initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/90">Selected demo</div>
                      <div className="mt-0.5 text-xs text-white/60">
                        A quick preview of their current sound
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur">
                      <div className="min-w-0">
                        <div className="truncate text-xs font-medium tracking-wide text-white/70">
                          Spotlight
                        </div>
                        <div className="mt-1 truncate text-sm text-white/90">
                          {profile.demos[0]?.title ?? "Recent sketch"}
                        </div>
                      </div>
                      <div className="shrink-0 text-white/80">
                        <PlayIcon className="h-9 w-9" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-12 md:py-14">
        <Container>
          <SectionTitle
            eyebrow="About"
            title="Creative identity"
            description="A quick read on the artist’s workflow, taste, and how they like to build with others."
          />

          <div className="mt-7 grid gap-5 lg:grid-cols-12">
            <Card className="p-6 lg:col-span-7">
              <div className="text-sm leading-relaxed text-white/75">{profile.bio}</div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs font-medium tracking-wide text-white/55">
                    Working style
                  </div>
                  <div className="mt-2 text-sm text-white/75">
                    {profile.collaborationStyle}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs font-medium tracking-wide text-white/55">
                    Delivery
                  </div>
                  <div className="mt-2 text-sm text-white/75">
                    Clear takes, organized stems, and enough direction to move fast without chaos.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 lg:col-span-5">
              <div className="text-xs font-medium tracking-wide text-white/55">
                Skills & instruments
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((s) => (
                  <Badge key={s} className="bg-white/[0.02] text-white/75">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 border-t border-white/5 pt-6">
                <div className="text-xs font-medium tracking-wide text-white/55">
                  Strengths
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.strengths.map((s) => (
                    <Badge key={s} className="bg-white/[0.02] text-white/75">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/5 py-12 md:py-14">
        <Container>
          <SectionTitle
            eyebrow="Taste"
            title="Musical influences"
            description="References help align taste, energy, and direction before the first session starts."
          />

          <Card className="mt-7 p-6">
            <div className="flex flex-wrap gap-2">
              {profile.influences.map((t) => (
                <Badge key={t} className="bg-white/[0.02] text-white/75">
                  {t}
                </Badge>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      <section className="relative border-t border-white/5 py-12 md:py-14">
        <Container>
          <SectionTitle
            eyebrow="Now"
            title="Looking for"
            description="The kinds of collaborations that would feel most relevant right now."
          />

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {profile.lookingFor.map((item) => (
              <Card key={item.title} className="p-6">
                <div className="text-sm font-semibold text-white/90">{item.title}</div>
                <div className="mt-3 text-sm leading-relaxed text-white/65">
                  {item.description}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/5 py-12 md:py-14">
        <Container>
          <SectionTitle
            eyebrow="Audio"
            title="Demos / tracks"
            description="Quick previews to get a sense of palette, tone, and direction."
          />

          <div className="mt-7 grid gap-5 lg:grid-cols-12">
            <div className="grid gap-4 lg:col-span-7">
              {profile.demos.map((d) => (
                <Card key={d.title} className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white/90">
                        {d.title}
                      </div>
                      <div className="mt-1 truncate text-sm text-white/60">{d.note}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-xs text-white/55">{d.length}</div>
                      <div className="text-white/80">
                        <PlayIcon className="h-9 w-9" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 h-8 rounded-xl border border-white/10 bg-white/[0.02]" />
                </Card>
              ))}
            </div>

            <Card className="p-6 lg:col-span-5">
              <div className="text-xs font-medium tracking-wide text-white/55">
                Session notes
              </div>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-white/85">Preferred vibe</div>
                  <div className="mt-1 text-white/60">
                    Warm groove, crisp pockets, and room for the vocal to breathe.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-white/85">What helps</div>
                  <div className="mt-1 text-white/60">
                    A reference track and a few lines describing the emotional target.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-white/85">Delivery</div>
                  <div className="mt-1 text-white/60">
                    Clean stems, a clear comp, and enough context to keep revisions efficient.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {profile.testimonials?.length ? (
        <section className="relative border-t border-white/5 py-12 md:py-14">
          <Container>
            <SectionTitle
              eyebrow="Trust"
              title="Recent collaborations"
              description="Lightweight proof of craft, communication, and reliability."
            />

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {profile.testimonials.map((t) => (
                <Card key={t.quote} className="p-6">
                  <div className="text-sm leading-relaxed text-white/75">“{t.quote}”</div>
                  <div className="mt-5 text-sm font-semibold text-white/85">{t.name}</div>
                  <div className="mt-1 text-sm text-white/55">{t.context}</div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="relative border-t border-white/5 py-12 md:py-14">
        <Container>
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-transparent" />
              <div className="relative p-7 md:p-8">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <div className="max-w-xl">
                    <div className="text-xs font-medium tracking-wide text-white/55">
                      Next step
                    </div>
                    <div className="mt-2 font-[var(--font-display)] text-2xl tracking-tight text-white">
                      Start a real collaboration.
                    </div>
                    <div className="mt-2 text-sm text-white/65">
                      Share a short brief — references, timeline, and what success looks like.
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Button href="#" className="sm:w-auto">
                      Message
                    </Button>
                    <Button href="#" variant="secondary" className="sm:w-auto">
                      Invite to collaborate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <Footer />
    </main>
  );
}