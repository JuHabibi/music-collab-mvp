import { Card, Container } from "@/components/ui";
import { homeH2GradientClass } from "@/features/home/homeHeading";

const points = [
  {
    title: "Less noise. More session‑energy.",
    desc: "Profiles and briefs are built around what you want to build: toplines, grooves, textures — not performance metrics."
  },
  {
    title: "Signal over vanity.",
    desc: "Influences, demos, availability, and deliverables make it easier to say yes (or no) fast — and keep it respectful."
  },
  {
    title: "A calmer place to finish tracks.",
    desc: "No scattered threads between groups, DMs, and apps. Just one place for direction, stems, and decisions."
  }
];

export function WhyBetter() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-xs font-medium tracking-wide text-paper-subtle">
              Why this feels better than social media
            </div>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
              <span className="text-white">Built for creative chemistry —</span>{" "}
              <span className={homeH2GradientClass}>not chaos.</span>
            </h2>
            <p className="text-paper-muted mt-4 max-w-md text-sm leading-relaxed">
              Social platforms are great for reach, but messy for collaboration.
              Vaultune is where you meet people who take sessions seriously —
              and move ideas forward.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="grid gap-4">
              {points.map((p) => (
                <Card key={p.title} className="border-white/[0.13] bg-white/[0.055] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="text-base font-semibold text-white">
                    {p.title}
                  </div>
                  <p className="text-paper-muted mt-2 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

