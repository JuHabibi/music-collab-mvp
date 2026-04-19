import * as React from "react";

import { cn } from "../../lib/cn";

export function Label({
  children,
  className,
  htmlFor
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-xs font-medium tracking-wide text-white/55",
        className
      )}
    >
      {children}
    </label>
  );
}
