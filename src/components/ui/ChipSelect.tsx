"use client";

import * as React from "react";

import { Badge } from "./Badge";
import { cn } from "../../lib/cn";

const defaultGenres = [
  "Neo‑soul",
  "Electronic",
  "Hip‑hop",
  "Indie",
  "House",
  "R&B",
  "Jazz",
  "Pop",
  "Ambient",
  "Funk",
  "Rock",
  "Latin"
];

export function ChipSelect({
  options = defaultGenres,
  max = 4,
  className,
  hint
}: {
  options?: string[];
  max?: number;
  className?: string;
  hint?: string;
}) {
  const [selected, setSelected] = React.useState<string[]>([]);

  function toggle(g: string) {
    setSelected((prev) => {
      if (prev.includes(g)) {
        return prev.filter((x) => x !== g);
      }
      if (prev.length >= max) {
        return prev;
      }
      return [...prev, g];
    });
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {options.map((g) => {
          const isOn = selected.includes(g);
          return (
            <button
              key={g}
              type="button"
              onClick={() => toggle(g)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide transition",
                isOn
                  ? "border-white/25 bg-white/[0.08] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                  : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/15 hover:bg-white/[0.04]"
              )}
            >
              {g}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-white/45">
        <span className="tabular-nums">
          {selected.length}/{max} selected
        </span>
        {hint ? (
          <>
            <span className="text-white/25">·</span>
            <span>{hint}</span>
          </>
        ) : null}
      </div>
      {selected.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {selected.map((g) => (
            <Badge key={g} className="bg-white/[0.04] text-white/80">
              {g}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
