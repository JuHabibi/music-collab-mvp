import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Badge, Button, Card, Container } from "@/components/ui";
import { Footer } from "@/components/Footer";
import { ServerHeader } from "@/components/ServerHeader";
import { AmbientBackground } from "@/features/home/components/Background";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Your artist profile — Vaultune",
  description: "Preview your published Vaultune artist profile.",
};


function formatCollaborationMode(mode: string) {
  if (mode === "remote") return "Remote";
  if (mode === "local") return "Local";
  if (mode === "both") return "Remote & local";
  return "Collaboration mode not set";
}

function formatAvailability(value: string) {
  if (value === "now") return "Available now";
  if (value === "month") return "This month";
  if (value === "casual") return "Casual only";
  return value || "Availability not set";
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      display_name,
      primary_role,
      genres,
      looking_for,
      availability,
      collaboration_mode,
      city,
      bio,
      influences,
      portfolio_links,
      publish_status
    `,
    )
    .eq("id", id)
    .eq("publish_status", "published")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!profile) {
    return <div className="p-8 text-white/60">Profile not found.</div>;
  }

  const isOwner = user?.id === profile.id;


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
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/55"
          aria-hidden="true"
        />

        <Container className="relative py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border border-emerald-200/15 bg-emerald-200/[0.06] text-emerald-200/90">
                  {formatAvailability(profile.availability)}
                </Badge>
                <Badge className="bg-white/[0.02] text-white/75">
                  {formatCollaborationMode(profile.collaboration_mode)}
                </Badge>
                {profile.city ? (
                  <Badge className="bg-white/[0.02] text-white/75">
                    {profile.city}
                  </Badge>
                ) : null}
              </div>

              <h1 className="mt-4 font-[var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl">
                {profile.display_name}
              </h1>

              <p className="mt-3 text-base text-white/70 sm:text-[17px]">
                {profile.primary_role}
                {profile.city ? (
                  <>
                    <span className="mx-2 text-white/35">·</span>
                    {profile.city}
                  </>
                ) : null}
              </p>

              {profile.bio ? (
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-[15px]">
                  {profile.bio}
                </p>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#" className="sm:w-auto">
                  Message
                </Button>
                <Button href="#" variant="secondary" className="sm:w-auto">
                  Invite to collaborate
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-12 md:py-14">
        <Container>
          <div className="grid gap-5 lg:grid-cols-12">
            <Card className="p-6 lg:col-span-6">
              <div className="text-xs font-medium tracking-wide text-white/55">
                Sound & style
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-2xl tracking-tight text-white">
                Genres
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.genres.map((genre : string) => (
                  <Badge key={genre} className="bg-white/[0.02] text-white/75">
                    {genre}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 lg:col-span-6">
              <div className="text-xs font-medium tracking-wide text-white/55">
                Taste
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-2xl tracking-tight text-white">
                Influences
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.influences.map((influence : string) => (
                  <Badge
                    key={influence}
                    className="bg-white/[0.02] text-white/75"
                  >
                    {influence}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/5 py-12 md:py-14">
        <Container>
          <Card className="p-6">
            <div className="text-xs font-medium tracking-wide text-white/55">
              Looking for
            </div>
            <h2 className="mt-3 font-[var(--font-display)] text-2xl tracking-tight text-white">
              Collaboration goals
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.looking_for.map((item : string) => (
                <Badge key={item} className="bg-white/[0.02] text-white/75">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      {profile.portfolio_links.length > 0 ? (
        <section className="relative border-t border-white/5 py-12 md:py-14">
          <Container>
            <Card className="p-6">
              <div className="text-xs font-medium tracking-wide text-white/55">
                Proof of work
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-2xl tracking-tight text-white">
                Portfolio links
              </h2>

              <div className="mt-5 grid gap-3">
                {profile.portfolio_links.map((link : string) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/75 transition hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </Card>
          </Container>
        </section>
      ) : null}

      <section className="relative border-t border-white/5 py-12 md:py-14">
        <Container>
          <Card className="overflow-hidden">
            <div className="relative p-7 md:p-8">
              <div className="max-w-xl">
                <div className="text-xs font-medium tracking-wide text-white/55">
                  Profile live
                </div>
                <div className="mt-2 font-[var(--font-display)] text-2xl tracking-tight text-white">
                  Your profile is ready.
                </div>
                <div className="mt-2 text-sm text-white/65">
                  Review how it appears, then start exploring collaborators.
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/discover" className="sm:w-auto">
                  Go to Discover
                </Button>
                {isOwner ? (
  <Button href="/profile/edit"  variant="secondary" className="sm:w-auto">
    Edit profile
  </Button>
) : null}
               
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <Footer />
    </main>
  );
}