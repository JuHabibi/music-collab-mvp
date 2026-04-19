import * as React from "react";

import { cn } from "../../lib/cn";

export function Fieldset({
  legend,
  description,
  children,
  className
}: {
  legend: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("space-y-4", className)}>
      <legend className="w-full px-0 pb-1">
        <div className="text-xs font-medium tracking-wide text-white/55">
          {legend}
        </div>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-white/55">
            {description}
          </p>
        ) : null}
      </legend>
      <div className="space-y-4 pt-2">{children}</div>
    </fieldset>
  );
}
