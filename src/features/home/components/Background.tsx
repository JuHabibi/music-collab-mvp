import * as React from "react";

export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.018),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/35 to-transparent" />
    </div>
  );
}