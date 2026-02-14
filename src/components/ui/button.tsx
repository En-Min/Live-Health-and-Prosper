"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.98]",
          // Variants
          variant === "primary" &&
            "bg-teal text-navy hover:bg-teal-light",
          variant === "secondary" &&
            "bg-surface-elevated text-foreground border border-border hover:bg-slate",
          variant === "ghost" &&
            "text-foreground-muted hover:text-foreground hover:bg-surface",
          variant === "danger" &&
            "bg-error text-white hover:bg-error/90",
          // Sizes
          size === "sm" && "h-9 px-3 text-sm",
          size === "md" && "h-11 px-5 text-sm min-w-[44px] min-h-[44px]",
          size === "lg" && "h-13 px-7 text-base min-w-[44px] min-h-[44px]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
