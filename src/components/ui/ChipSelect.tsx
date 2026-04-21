"use client";

import { cn } from "../../lib/cn";
import { Badge } from "./Badge";

const defaultGenres = [
  "Neo-soul",
  "Electronic",
  "Hip-hop",
  "Indie",
  "House",
  "R&B",
  "Jazz",
  "Pop",
  "Ambient",
  "Funk",
  "Rock",
  "Latin",
];

type ChipSelectProps = {
  value: string[];
  onChange: (next: string[]) => void;
  options?: string[];
  max?: number;
  className?: string;
  hint?: string;
};

export function ChipSelect({
  value,
  onChange,
  options = defaultGenres,
  max = 4,
  className,
  hint,
}: ChipSelectProps) {
  function toggle(item: string) {
    const isSelected = value.includes(item);

    if (isSelected) {
      onChange(value.filter((x) => x !== item));
      return;
    }

    if (value.length >= max) {
      return;
    }
    onChange([...value, item]);
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const active = value.includes(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide transition",
                active
                  ? "border-white/25 bg-white/[0.08] text-white"
                  : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/15",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-white/45">
        <span>
          {value.length}/{max} selected
        </span>

        {hint ? (
          <>
            <span className="text-white/25">·</span>
            <span>{hint}</span>
          </>
        ) : null}
      </div>

      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {value.map((item) => (
            <Badge key={item} className="bg-white/[0.04] text-white/80">
              {item}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
