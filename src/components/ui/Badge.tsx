import * as React from "react";

import { cn } from "../../lib/cn";

export function Badge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-white/80",
        className
      )}
    >
      {children}
    </span>
  );
}
