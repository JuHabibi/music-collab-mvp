import * as React from "react";

import { cn } from "../../lib/cn";

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  href?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:translate-y-[1px]";
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-11 px-5 text-sm"
  } as const;
  const variants = {
    primary:
      "bg-white text-black shadow-[0_18px_60px_rgba(255,255,255,0.08)] hover:bg-white/90",
    secondary:
      "border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.07]",
    ghost: "text-white/75 hover:text-white hover:bg-white/[0.04]"
  } as const;

  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {children}
    </Comp>
  );
}
