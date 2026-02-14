import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "teal" | "amber" | "success" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-surface-elevated text-foreground-muted",
        variant === "teal" && "bg-teal/15 text-teal-light",
        variant === "amber" && "bg-amber/15 text-amber-light",
        variant === "success" && "bg-success/15 text-success",
        variant === "outline" && "border border-border text-foreground-muted",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
