import * as React from "react";

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/70">
      {children}
    </kbd>
  );
}
