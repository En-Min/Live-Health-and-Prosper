"use client";

import { cn } from "@/lib/utils";

interface FilterChipsProps {
  options: readonly string[];
  selected: string | null;
  onChange: (value: string | null) => void;
}

export function FilterChips({ options, selected, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
          "min-h-[36px]",
          !selected
            ? "bg-teal text-navy"
            : "bg-surface-elevated text-foreground-muted hover:text-foreground"
        )}
      >
        All
      </button>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(selected === option ? null : option)}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            "min-h-[36px] whitespace-nowrap",
            selected === option
              ? "bg-teal text-navy"
              : "bg-surface-elevated text-foreground-muted hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
