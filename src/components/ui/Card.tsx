import * as React from "react";

import { cn } from "../../lib/cn";

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] shadow-card backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}
