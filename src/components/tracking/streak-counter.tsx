"use client";

import { cn } from "@/lib/utils";
import type { StreakData } from "@/types/tracking";

interface StreakCounterProps {
  streak: StreakData;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex gap-3">
      {/* Current streak */}
      <div className="flex-1 rounded-xl border border-border bg-surface p-4 text-center">
        <div className={cn(
          "text-3xl font-bold font-data",
          streak.current_streak > 0 ? "text-teal" : "text-foreground-muted"
        )}>
          {streak.current_streak}
        </div>
        <p className="text-[10px] text-foreground-muted uppercase tracking-wider mt-1">
          Current Streak
        </p>
        {streak.current_streak > 0 && (
          <p className="text-xs text-foreground-muted mt-1">
            {streak.current_streak === 1 ? "day" : "days"}
          </p>
        )}
      </div>

      {/* Best streak */}
      <div className="flex-1 rounded-xl border border-border bg-surface p-4 text-center">
        <div className={cn(
          "text-3xl font-bold font-data",
          streak.best_streak > 0 ? "text-amber" : "text-foreground-muted"
        )}>
          {streak.best_streak}
        </div>
        <p className="text-[10px] text-foreground-muted uppercase tracking-wider mt-1">
          Best Streak
        </p>
        {streak.best_streak > 0 && (
          <p className="text-xs text-foreground-muted mt-1">
            {streak.best_streak === 1 ? "day" : "days"}
          </p>
        )}
      </div>
    </div>
  );
}
