import type { Metadata } from "next";

import {
  Badge,
  Button,
  Card,
  ChipSelect,
  Container,
  Fieldset,
  Input,
  Label,
  Progress,
  Select,
  TagInput,
  Textarea,
  cn
} from "@/components/ui";
import { AmbientBackground } from "@/features/home/components/Background";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Build your profile — Vaultune",
  description:
    "Complete your Vaultune profile to get better collaboration matches."
};

const choiceCard =
  "flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/14 has-[:checked]:border-white/22 has-[:checked]:bg-white/[0.05]";

const radioClass =
  "mt-0.5 h-4 w-4 shrink-0 border-white/20 bg-white/[0.03] text-violet-300 accent-violet-300 focus:ring-2 focus:ring-white/20";

const checkboxClass =
  "h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.03] text-violet-300 accent-violet-300 focus:ring-2 focus:ring-white/20";

export default function OnboardingPage() {
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
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/93 to-ink-950/50"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent"
          aria-hidden="true"
        />
        <Container className="relative py-12 md:py-14">
          <div className="max-w-3xl">
            <div className="text-xs font-medium tracking-wide text-white/55">
              Onboarding
            </div>
            <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl">
              Build your profile
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-[17px]">
              Better profiles create better matches.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Badge className="w-fit bg-white/[0.04] text-white/80">
                Step 1 of 1
              </Badge>
              <div className="w-full max-w-xs sm:max-w-sm">
                <Progress value={0} label="Profile completion" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-10 md:py-12">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <Card className="p-6 sm:p-8">
              <div className="border-b border-white/5 pb-6">
                <h2 className="font-[var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                  Identity
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  How you show up in discovery and messages.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display name</Label>
                  <Input
                    id="display-name"
                    name="displayName"
                    placeholder="Your artist or real name"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-role">Primary role</Label>
                  <Select id="primary-role" name="primaryRole" defaultValue="">
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="producer">Producer</option>
                    <option value="vocalist">Vocalist</option>
                    <option value="guitarist">Guitarist</option>
                    <option value="beatmaker">Beatmaker</option>
                    <option value="songwriter">Songwriter</option>
                    <option value="mixing-engineer">Mixing engineer</option>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <div className="border-b border-white/5 pb-6">
                <h2 className="font-[var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                  Sound &amp; style
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  Genres set the palette — influences set the taste.
                </p>
              </div>

              <div className="mt-6 space-y-8">
                <Fieldset legend="Genres" description="Pick up to four that feel most like you.">
                  <ChipSelect max={4} hint="Tap to select or remove." />
                </Fieldset>

                <div className="space-y-2">
                  <Label htmlFor="influences">Influences</Label>
                  <TagInput
                    id="influences"
                    placeholder="e.g. Sade, Kaytranada, Radiohead…"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <Fieldset
                legend="What you’re looking for"
                description="Select everything that applies — clarity beats breadth."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Long-term collaborator",
                    "One-off session",
                    "Vocalist for tracks",
                    "Producer for my songs",
                    "Feedback exchange"
                  ].map((label) => (
                    <label key={label} className={cn(choiceCard, "items-center py-3")}>
                      <input
                        type="checkbox"
                        name="lookingFor"
                        value={label}
                        className={checkboxClass}
                      />
                      <span className="text-sm text-white/80">{label}</span>
                    </label>
                  ))}
                </div>
              </Fieldset>
            </Card>

            <Card className="p-6 sm:p-8">
              <Fieldset legend="Availability" description="What does “right now” mean for you?">
                <div className="grid gap-3">
                  {[
                    { id: "avail-now", value: "now", title: "Available now", sub: "Ready to start soon." },
                    {
                      id: "avail-month",
                      value: "month",
                      title: "This month",
                      sub: "Flexible within the next few weeks."
                    },
                    {
                      id: "avail-casual",
                      value: "casual",
                      title: "Casual only",
                      sub: "Slow cadence, low pressure."
                    }
                  ].map((o) => (
                    <label key={o.id} htmlFor={o.id} className={choiceCard}>
                      <input
                        id={o.id}
                        type="radio"
                        name="availability"
                        value={o.value}
                        className={radioClass}
                      />
                      <span>
                        <span className="block text-sm font-medium text-white/90">
                          {o.title}
                        </span>
                        <span className="mt-1 block text-xs text-white/50">{o.sub}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </Fieldset>
            </Card>

            <Card className="p-6 sm:p-8">
              <Fieldset
                legend="Collaboration mode"
                description="Where are you most comfortable building?"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { id: "mode-remote", value: "remote", label: "Remote" },
                    { id: "mode-local", value: "local", label: "Local" },
                    { id: "mode-both", value: "both", label: "Both" }
                  ].map((o) => (
                    <label key={o.id} htmlFor={o.id} className={cn(choiceCard, "items-center py-4")}>
                      <input
                        id={o.id}
                        type="radio"
                        name="collaborationMode"
                        value={o.value}
                        className={radioClass}
                      />
                      <span className="text-sm font-medium text-white/88">{o.label}</span>
                    </label>
                  ))}
                </div>
              </Fieldset>
            </Card>

            <Card className="p-6 sm:p-8">
              <div className="border-b border-white/5 pb-6">
                <h2 className="font-[var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                  Location
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  City-level is enough — precise addresses aren’t needed.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Paris, Berlin, Montréal…"
                  autoComplete="address-level2"
                />
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <div className="border-b border-white/5 pb-6">
                <h2 className="font-[var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                  Proof of work
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  Link out to what you want people to hear first.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="link-soundcloud">SoundCloud</Label>
                  <Input
                    id="link-soundcloud"
                    name="soundcloud"
                    type="url"
                    placeholder="https://soundcloud.com/…"
                    autoComplete="url"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-spotify">Spotify</Label>
                  <Input
                    id="link-spotify"
                    name="spotify"
                    type="url"
                    placeholder="https://open.spotify.com/…"
                    autoComplete="url"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-youtube">YouTube</Label>
                  <Input
                    id="link-youtube"
                    name="youtube"
                    type="url"
                    placeholder="https://youtube.com/…"
                    autoComplete="url"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <div className="border-b border-white/5 pb-6">
                <h2 className="font-[var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                  Bio
                  <span className="ml-2 text-sm font-normal text-white/45">(optional)</span>
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  A short paragraph beats a résumé — vibe, taste, and intent.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <Label htmlFor="bio">About you</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  placeholder="What you make, how you like to work, and what a great session looks like."
                />
              </div>
            </Card>

            <Card className="overflow-hidden border-white/10 p-6 sm:p-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-transparent" />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs font-medium tracking-wide text-white/55">
                      Ready
                    </div>
                    <p className="mt-1 text-sm text-white/65">
                      You can publish now and refine details later.
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-end">
                    <Button variant="secondary" type="button" className="w-full sm:w-auto">
                      Save draft
                    </Button>
                    <Button type="button" className="w-full sm:w-auto">
                      Publish profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
