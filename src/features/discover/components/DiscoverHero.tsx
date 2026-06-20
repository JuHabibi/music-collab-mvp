import { Container } from "@/components/ui";

export function DiscoverHero() {
  return (
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
  );
}
