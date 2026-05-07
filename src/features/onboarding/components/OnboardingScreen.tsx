"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  cn,
} from "@/components/ui";
import { supabaseClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const choiceCard =
  "flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/14 has-[:checked]:border-white/22 has-[:checked]:bg-white/[0.05]";

const radioClass =
  "mt-0.5 h-4 w-4 shrink-0 border-white/20 bg-white/[0.03] text-violet-300 accent-violet-300 focus:ring-2 focus:ring-white/20";

const checkboxClass =
  "h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.03] text-violet-300 accent-violet-300 focus:ring-2 focus:ring-white/20";

type ProfilePayload = {
  id: string;
  display_name: string;
  primary_role: string;
  genres: string[];
  looking_for: string[];
  availability: string;
  collaboration_mode: "remote" | "local" | "both" | "";
  city: string | null;
  bio: string | null;
  influences: string[];
  portfolio_links: string[];
  publish_status: "draft" | "published";
};

type OnboardingScreenProps = {
  initialIsAuthed: boolean;
  initialProfile: ProfilePayload | null;
  mode?: "onboarding" | "edit";
};

function socialUrlField({
  label,
  allowedHosts,
}: {
  label: string;
  allowedHosts: string[];
}) {
  const allowed = new Set(allowedHosts.map((h) => h.toLowerCase()));
  return z
    .union([
      z.literal(""),
      z
        .url({ message: `URL ${label} invalide` })
        .trim()
        .refine(
          (value) => {
            try {
              const host = new URL(value).hostname.toLowerCase();
              return allowed.has(host);
            } catch {
              return false;
            }
          },
          { message: `L’URL doit être un lien ${label}` },
        ),
    ])
    .transform((v) => (typeof v === "string" ? v.trim() : v));
}

const formSchema = z.object({
  displayName: z.string(),
  primaryRole: z.string(),
  genres: z.array(z.string()),
  lookingFor: z.array(z.string()),
  availability: z.string(),
  collaborationMode: z.enum(["remote", "local", "both"]).or(z.literal("")),
  city: z.string(),
  bio: z.string(),
  influences: z.array(z.string()),
  soundcloud: socialUrlField({
    label: "SoundCloud",
    allowedHosts: ["soundcloud.com", "www.soundcloud.com", "on.soundcloud.com"],
  }),
  spotify: socialUrlField({
    label: "Spotify",
    allowedHosts: ["open.spotify.com", "spotify.com", "www.spotify.com"],
  }),
  youtube: socialUrlField({
    label: "YouTube",
    allowedHosts: [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "music.youtube.com",
      "youtu.be",
    ],
  }),
});

export function OnboardingScreen({
  initialIsAuthed,
  initialProfile,
  mode = "onboarding",
}: OnboardingScreenProps) {
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [publishBlockingErrors, setPublishBlockingErrors] = useState<string[]>([]);
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: initialProfile?.display_name ?? "",
      primaryRole: initialProfile?.primary_role ?? "",
      genres: initialProfile?.genres ?? [],
      lookingFor: initialProfile?.looking_for ?? [],
      availability: initialProfile?.availability ?? "",
      collaborationMode: initialProfile?.collaboration_mode ?? "",
      city: initialProfile?.city ?? "",
      bio: initialProfile?.bio ?? "",
      influences: initialProfile?.influences ?? [],
      soundcloud:
        initialProfile?.portfolio_links?.find((link) =>
          link.includes("soundcloud.com")
        ) ?? "",
      spotify:
        initialProfile?.portfolio_links?.find((link) =>
          link.includes("spotify.com")
        ) ?? "",
      youtube:
        initialProfile?.portfolio_links?.find(
          (link) =>
            link.includes("youtube.com") || link.includes("youtu.be")
        ) ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = form;

  const scrollToField = (field: string) => {
    const idByField: Record<string, string> = {
      displayName: "display-name",
      primaryRole: "primary-role",
      genres: "genres-field",
      influences: "influences",
      lookingFor: "looking-for-field",
      availability: "avail-now",
      collaborationMode: "mode-remote",
      city: "city",
      soundcloud: "link-soundcloud",
      spotify: "link-spotify",
      youtube: "link-youtube",
    };

    const id = idByField[field];
    if (id) {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      document.getElementById(id)?.focus?.();
    }

    setFocus(field as never);
  };

  const mapFormToSaveDraftPayload = (data: z.infer<typeof formSchema>) => {
    return {
      display_name: data.displayName?.trim() ?? "",
      primary_role: data.primaryRole?.trim() ?? "",
      availability: data.availability?.trim() ?? "",
      city: data.city?.trim() || null,
      bio: data.bio?.trim() || null,
      influences: data.influences.map((x) => x.trim()).filter(Boolean),
      portfolio_links: [data.soundcloud, data.spotify, data.youtube].filter(
        Boolean,
      ),
    };
  };

  const getSubmitIntent = (
    e?: React.BaseSyntheticEvent,
  ): "draft" | "published" => {
    const submitter = (e?.nativeEvent as SubmitEvent | undefined)?.submitter as
      | HTMLButtonElement
      | null
      | undefined;
    const intent = submitter?.dataset?.intent;
    return intent === "published" ? "published" : "draft";
  };

  const validateForPublish = (data: z.infer<typeof formSchema>) => {
    const messages: string[] = [];
    const firstErrorFieldOrder: Array<keyof z.infer<typeof formSchema>> = [];

    if (!data.displayName?.trim()) {
      setError("displayName", {
        type: "validate",
        message: "Un display name est requis pour publier",
      });
      messages.push("Ajoute un display name.");
      firstErrorFieldOrder.push("displayName");
    }
    if (!data.primaryRole?.trim()) {
      setError("primaryRole", {
        type: "validate",
        message: "Un rôle principal est requis pour publier",
      });
      messages.push("Choisis un rôle principal.");
      firstErrorFieldOrder.push("primaryRole");
    }
    if (!data.genres?.length) {
      setError("genres", {
        type: "validate",
        message: "Choisis au moins un genre pour publier",
      });
      messages.push("Choisis au moins un genre.");
      firstErrorFieldOrder.push("genres");
    }
    if (!data.lookingFor?.length) {
      setError("lookingFor", {
        type: "validate",
        message: "Sélectionne au moins un objectif de collaboration",
      });
      messages.push("Sélectionne au moins un objectif de collaboration.");
      firstErrorFieldOrder.push("lookingFor");
    }
    if (!data.availability?.trim()) {
      setError("availability", {
        type: "validate",
        message: "Choisis une disponibilité pour publier",
      });
      messages.push("Choisis une disponibilité.");
      firstErrorFieldOrder.push("availability");
    }
    if (!data.collaborationMode?.trim()) {
      setError("collaborationMode", {
        type: "validate",
        message: "Choisis un mode de collaboration pour publier",
      });
      messages.push("Choisis un mode de collaboration.");
      firstErrorFieldOrder.push("collaborationMode");
    }

    const mode = data.collaborationMode;
    if ((mode === "local" || mode === "both") && !data.city?.trim()) {
      setError("city", {
        type: "validate",
        message: "La ville est requise si tu publies en local/both",
      });
      messages.push("Renseigne une ville (requis en local/both).");
      firstErrorFieldOrder.push("city");
    }

    const hasInfluences = (data.influences?.length ?? 0) > 0;
    const hasPortfolioLinks =
      [data.soundcloud, data.spotify, data.youtube].filter(Boolean).length > 0;
    if (!hasInfluences && !hasPortfolioLinks) {
      setError("influences", {
        type: "validate",
        message:
          "Ajoute au moins une influence ou au moins un lien (SoundCloud/Spotify/YouTube) pour publier",
      });
      messages.push("Ajoute au moins une influence ou au moins un lien.");
      firstErrorFieldOrder.push("influences");
    }

    return {
      ok: messages.length === 0,
      messages,
      firstField: firstErrorFieldOrder[0],
    };
  };

  const onSubmit = async (
    data: z.infer<typeof formSchema>,
    e?: React.BaseSyntheticEvent,
  ) => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
  
    setSaveMessage(null);
    setSaveError(null);
  
    if (!user) {
      setSaveError("Your session has expired. Please sign in again.");
      return;
    }
  
    const intent = getSubmitIntent(e);
    setPublishBlockingErrors([]);
  
    if (intent === "published") {
      const result = validateForPublish(data);
      if (!result.ok) {
        setPublishBlockingErrors(result.messages);
        if (result.firstField) {
          scrollToField(result.firstField);
        }
        return;
      }
    }
  
    const transformData = mapFormToSaveDraftPayload(data);
  
    const payload: ProfilePayload = {
      id: user.id,
      ...transformData,
      genres: data.genres,
      looking_for: data.lookingFor,
      collaboration_mode: data.collaborationMode,
      publish_status: intent,
    };
  
    const { error } = await supabaseClient
      .from("profiles")
      .upsert(payload, { onConflict: "id" });
  
    if (error) {
      setSaveError("We couldn’t save your profile.");
      return;
    }
  
    if (intent === "published") {
      setSaveMessage("Profile published.");
      router.push(
        `/artist/${payload.display_name.toLowerCase().replace(/ /g, "-")}`
      );
      router.refresh();
      return;
    }
    setSaveMessage("Draft saved.");
  };

  return (
    <main className="relative">
      <Header initialIsAuthed={initialIsAuthed} />
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
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-6"
          >
            {publishBlockingErrors.length > 0 ? (
              <Card className="border-red-400/20 bg-red-400/[0.06] p-5">
                <div className="text-sm font-medium text-red-200">
                  Pour publier, il manque :
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-100/90">
                  {publishBlockingErrors.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </Card>
            ) : null}
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
                    {...register("displayName")}
                    placeholder="Your artist or real name"
                    autoComplete="name"
                  />
                  {errors.displayName?.message ? (
                    <p className="text-xs text-red-300">
                      {errors.displayName.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-role">Primary role</Label>
                  <Select
                    id="primary-role"
                    {...register("primaryRole")}
                    defaultValue=""
                  >
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
                  {errors.primaryRole?.message ? (
                    <p className="text-xs text-red-300">
                      {errors.primaryRole.message}
                    </p>
                  ) : null}
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
                <Fieldset
                  legend="Genres"
                  description="Pick up to four that feel most like you."
                >
                  <div id="genres-field" className="space-y-2">
                    <Controller
                      control={form.control}
                      name="genres"
                      render={({ field }) => (
                        <ChipSelect
                          value={field.value}
                          onChange={field.onChange}
                          max={4}
                          hint="Tap to select or remove."
                        />
                      )}
                    />
                    {errors.genres?.message ? (
                      <p className="mt-2 text-xs text-red-300">
                        {errors.genres.message}
                      </p>
                    ) : null}
                  </div>
                </Fieldset>

                <div className="space-y-2">
                  <Label htmlFor="influences">Influences</Label>
                  <Controller
                    control={form.control}
                    name="influences"
                    render={({ field }) => (
                      <TagInput
                        id="influences"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="e.g. Sade, Kaytranada, Radiohead…"
                      />
                    )}
                  />
                  {errors.influences?.message ? (
                    <p className="text-xs text-red-300">
                      {errors.influences.message}
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <Fieldset
                legend="What you’re looking for"
                description="Select everything that applies — clarity beats breadth."
              >
                <div id="looking-for-field" className="space-y-2">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Long-term collaborator",
                      "One-off session",
                      "Vocalist for tracks",
                      "Producer for my songs",
                      "Feedback exchange",
                    ].map((label) => (
                      <label
                        key={label}
                        className={cn(choiceCard, "items-center py-3")}
                      >
                        <input
                          type="checkbox"
                          {...register("lookingFor")}
                          value={label}
                          className={checkboxClass}
                        />
                        <span className="text-sm text-white/80">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.lookingFor?.message ? (
                    <p className="mt-2 text-xs text-red-300">
                      {errors.lookingFor.message}
                    </p>
                  ) : null}
                </div>
              </Fieldset>
            </Card>

            <Card className="p-6 sm:p-8">
              <Fieldset
                legend="Availability"
                description="What does “right now” mean for you?"
              >
                <div className="grid gap-3">
                  {[
                    {
                      id: "avail-now",
                      value: "now",
                      title: "Available now",
                      sub: "Ready to start soon.",
                    },
                    {
                      id: "avail-month",
                      value: "month",
                      title: "This month",
                      sub: "Flexible within the next few weeks.",
                    },
                    {
                      id: "avail-casual",
                      value: "casual",
                      title: "Casual only",
                      sub: "Slow cadence, low pressure.",
                    },
                  ].map((o) => (
                    <label key={o.id} htmlFor={o.id} className={choiceCard}>
                      <input
                        id={o.id}
                        type="radio"
                        {...register("availability")}
                        value={o.value}
                        className={radioClass}
                      />
                      <span>
                        <span className="block text-sm font-medium text-white/90">
                          {o.title}
                        </span>
                        <span className="mt-1 block text-xs text-white/50">
                          {o.sub}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.availability?.message ? (
                  <p className="mt-2 text-xs text-red-300">
                    {errors.availability.message}
                  </p>
                ) : null}
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
                    { id: "mode-both", value: "both", label: "Both" },
                  ].map((o) => (
                    <label
                      key={o.id}
                      htmlFor={o.id}
                      className={cn(choiceCard, "items-center py-4")}
                    >
                      <input
                        id={o.id}
                        type="radio"
                        {...register("collaborationMode")}
                        value={o.value}
                        className={radioClass}
                      />
                      <span className="text-sm font-medium text-white/88">
                        {o.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.collaborationMode?.message ? (
                  <p className="mt-2 text-xs text-red-300">
                    {errors.collaborationMode.message}
                  </p>
                ) : null}
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
                  {...register("city")}
                  placeholder="Paris, Berlin, Montréal…"
                  autoComplete="address-level2"
                />
                {errors.city?.message ? (
                  <p className="text-xs text-red-300">{errors.city.message}</p>
                ) : null}
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
                    {...register("soundcloud")}
                    type="url"
                    placeholder="https://soundcloud.com/…"
                    autoComplete="url"
                  />
                  {errors.soundcloud?.message ? (
                    <p className="text-xs text-red-300">
                      {errors.soundcloud.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-spotify">Spotify</Label>
                  <Input
                    id="link-spotify"
                    {...register("spotify")}
                    type="url"
                    placeholder="https://open.spotify.com/…"
                    autoComplete="url"
                  />
                  {errors.spotify?.message ? (
                    <p className="text-xs text-red-300">
                      {errors.spotify.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-youtube">YouTube</Label>
                  <Input
                    id="link-youtube"
                    {...register("youtube")}
                    type="url"
                    placeholder="https://youtube.com/…"
                    autoComplete="url"
                  />
                  {errors.youtube?.message ? (
                    <p className="text-xs text-red-300">
                      {errors.youtube.message}
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <div className="border-b border-white/5 pb-6">
                <h2 className="font-[var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                  Bio
                  <span className="ml-2 text-sm font-normal text-white/45">
                    (optional)
                  </span>
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  A short paragraph beats a résumé — vibe, taste, and intent.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <Label htmlFor="bio">About you</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
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
                    <Button
                      variant="secondary"
                      type="submit"
                      data-intent="draft"
                      className="w-full sm:w-auto"
                    >
                      Save draft
                    </Button>
                    <Button
                      type="submit"
                      data-intent="published"
                      className="w-full sm:w-auto"
                    >
                      Publish profile
                    </Button>
                  </div>
                </div>
                {saveMessage && <p className="text-xs text-green-300">{saveMessage}</p>}
                {saveError && <p className="text-xs text-red-300">{saveError}</p>}  
                {isPublishing && <p className="text-xs text-yellow-300">Publishing...</p>}
              </div>
            </Card>
          </form>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
