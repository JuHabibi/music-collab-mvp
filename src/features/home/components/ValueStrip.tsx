import { Badge, Container } from "@/components/ui";

const roles = ["Producers", "Singers", "Guitarists", "Beatmakers", "Songwriters"];

export function ValueStrip() {
  return (
    <section className="border-y border-white/5 bg-ink-900/20">
      <Container className="flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
        <div className="text-sm text-paper-muted">
          Built for sessions and release‑ready work — fewer “🔥🔥🔥”, more real
          direction.
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <Badge key={r}>{r}</Badge>
          ))}
        </div>
      </Container>
    </section>
  );
}

