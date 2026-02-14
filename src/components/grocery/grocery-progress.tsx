"use client";

import { cn } from "@/lib/utils";

interface GroceryProgressProps {
  checked: number;
  total: number;
  percentage: number;
}

export function GroceryProgress({ checked, total, percentage }: GroceryProgressProps) {
  if (total === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-data text-foreground-muted">
          {checked} of {total} items
        </span>
        <span
          className={cn(
            "text-xs font-data font-medium",
            percentage === 100 ? "text-success" : "text-teal"
          )}
        >
          {percentage}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            percentage === 100 ? "bg-success" : "bg-teal"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
