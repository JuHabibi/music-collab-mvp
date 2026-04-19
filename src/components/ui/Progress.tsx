import * as React from "react";

import { cn } from "../../lib/cn";

export function Progress({
  value,
  max = 100,
  className,
  trackClassName,
  label
}: {
  value: number;
  max?: number;
  className?: string;
  trackClassName?: string;
  label?: string;
}) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <div className="flex items-center justify-between gap-3 text-xs text-white/55">
          <span>{label}</span>
          <span className="tabular-nums text-white/70">{Math.round(pct)}%</span>
        </div>
      ) : null}
      <div
        className={cn(
          "h-2 w-full overflow-hidden rounded-full bg-white/[0.06]",
          trackClassName
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-400/85 to-cyan-400/75 shadow-[0_0_24px_rgba(123,97,255,0.22)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
