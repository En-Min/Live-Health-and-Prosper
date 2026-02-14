"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg bg-surface-elevated border border-border px-4 py-3",
            "text-foreground placeholder:text-muted",
            "focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent",
            "transition-colors min-h-[44px]",
            error && "border-error focus:ring-error",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
