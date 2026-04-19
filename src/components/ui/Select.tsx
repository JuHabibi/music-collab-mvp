import * as React from "react";

import { cn } from "../../lib/cn";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-4 pr-11 text-sm text-white outline-none",
          "focus-visible:ring-2 focus-visible:ring-white/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&>option]:bg-ink-950 [&>option]:text-white",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
    </div>
  );
});
