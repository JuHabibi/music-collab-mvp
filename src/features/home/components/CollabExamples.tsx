import { IconArrowRight, IconMessage, IconPin } from "./Icons";
import { Badge, Button, Card, Container } from "@/components/ui";
import { homeH2GradientClass } from "@/features/home/homeHeading";

type CollabPost = {
  title: string;
  by: string;
  location: string;
  tags: string[];
  detail: string;
  lookingFor: string;
  vibe: string;
  deliverables: string[];
  when: string;
};

const posts: CollabPost[] = [
  {
    title: "Looking for a neo‑soul vocalist for an EP",
    by: "Producer • “Kaito V.”",
    location: "Berlin / Remote",
    tags: ["Neo‑Soul", "Toplines", "2 tracks"],
    lookingFor: "Vocal takes + topline ideas",
    vibe: "warm / intimate / late‑night",
    deliverables: ["Hook + BGVs", "Dry stems", "Quick comp"],
    when: "This week",
    detail:
      "Need a voice that sits in the pocket. References: Cleo Sol, Sabrina Claudio, D’Angelo. Split or fee — flexible."
  },
  {
    title: "Funk guitarist wanted for a live session",
    by: "Band • “The Side Room”",
    location: "Paris",
    tags: ["Funk", "Live takes", "Session"],
    lookingFor: "Tight rhythm + tasteful fills",
    vibe: "clean / dry / pocket",
    deliverables: ["2–3 takes", "DI + amp (optional)", "Tempo‑locked"],
    when: "Sat afternoon",
    detail:
      "One afternoon session. Think Nile‑style precision, no overplaying. We’ll send a rough mix + charts."
  },
  {
    title: "Producer seeking feedback on a demo",
    by: "Artist • “Mina R.”",
    location: "Lyon / Remote",
    tags: ["Alt‑R&B", "Arrangement", "Mix notes"],
    lookingFor: "Ears on transitions + arrangement",
    vibe: "moody / spacious",
    deliverables: ["Timestamped notes", "Alt bridge ideas", "Mix balance pointers"],
    when: "Next 48h",
    detail:
      "I’m stuck on energy between verse 2 and the lift. Looking for honest notes, not “🔥🔥🔥”."
  }
];

export function CollabExamples() {
  return (
    <section id="collaborate" className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-medium tracking-wide text-paper-subtle">
              Featured collaboration examples
            </div>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
              <span className="text-white">Real briefs.</span>{" "}
              <span className={homeH2GradientClass}>Real sessions.</span>
            </h2>
            <p className="text-paper-muted mt-4 max-w-xl text-sm leading-relaxed">
              A good collaboration starts with clarity: vibe, role, and what
              “done” looks like. Enough detail to feel the groove before you DM.
            </p>
          </div>
          <Button href="#join" variant="secondary">
            Post a brief
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.title} className="relative flex h-full flex-col overflow-hidden border-white/[0.13] bg-white/[0.055] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(420px_140px_at_30%_10%,rgba(255,255,255,0.07),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]"
              />
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-semibold text-white">
                  {p.title}
                </div>
              </div>
              <div className="mt-3 text-xs text-paper-subtle">{p.by}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-paper-subtle">
                <IconPin className="h-4 w-4" />
                {p.location}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t} className="border-white/[0.12] bg-white/[0.05]">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-white/[0.12] bg-black/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-paper-subtle">Looking for</div>
                    <div className="text-paper-muted mt-0.5 text-xs font-medium">
                      {p.lookingFor}
                    </div>
                  </div>
                  <div className="rounded-full border border-white/[0.12] bg-white/[0.05] px-2 py-1 text-[11px] text-paper-muted">
                    {p.when}
                  </div>
                </div>
                <div className="text-[11px] text-paper-subtle">
                  Vibe: <span className="text-paper-muted">{p.vibe}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[11px] text-paper-muted"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-paper-muted mt-4 text-sm leading-relaxed">{p.detail}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-xs text-paper-subtle">Typical reply: ~2h</div>
                <Button variant="secondary" size="sm" href="#join" className="h-9 px-3">
                  Start the thread
                  <IconMessage className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

