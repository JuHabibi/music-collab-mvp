import * as React from "react";

import { cn } from "../../lib/cn";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const {
    className,
    variant = "primary",
    size = "md",
    href,
    ...rest
  } = props as ButtonProps;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:translate-y-[1px]";
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-11 px-5 text-sm",
  } as const;
  const variants = {
    primary:
      "bg-white text-black shadow-[0_18px_60px_rgba(255,255,255,0.08)] hover:bg-white/90",
    secondary:
      "border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.07]",
    ghost: "text-white/75 hover:text-white hover:bg-white/[0.04]",
  } as const;

  if (href) {
    const { children, ...anchorProps } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        className={cn(base, sizes[size], variants[variant], className)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { children, type, ...buttonProps } =
    rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type ?? "button"}
      className={cn(base, sizes[size], variants[variant], className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
