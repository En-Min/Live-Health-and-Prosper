"use client";

import { cn } from "@/lib/utils";
import type { DailyStats } from "@/types/tracking";

interface WeeklyNutritionChartProps {
  history: DailyStats[];
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeeklyNutritionChart({ history }: WeeklyNutritionChartProps) {
  const chartHeight = 120;
  const barWidth = 28;
  const gap = 8;
  const totalWidth = history.length * (barWidth + gap) - gap;
  const paddingTop = 8;
  const paddingBottom = 24; // space for day labels

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h3 className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-teal">
          <path fillRule="evenodd" d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12 2H4Zm.75 4a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A.75.75 0 0 0 4.75 6ZM8 4a.75.75 0 0 0-.75.75v6.5a.75.75 0 0 0 1.5 0v-6.5A.75.75 0 0 0 8 4Zm2.5 3.5a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
        </svg>
        Last 7 Days — Meal Completion
      </h3>

      <div className="flex justify-center overflow-x-auto">
        <svg
          width={totalWidth + 16}
          height={chartHeight + paddingTop + paddingBottom}
          viewBox={`0 0 ${totalWidth + 16} ${chartHeight + paddingTop + paddingBottom}`}
          className="block"
        >
          {/* Target line at 100% */}
          <line
            x1={0}
            y1={paddingTop}
            x2={totalWidth + 16}
            y2={paddingTop}
            stroke="currentColor"
            strokeDasharray="4 3"
            className="text-border"
            strokeWidth={1}
          />
          <text
            x={totalWidth + 14}
            y={paddingTop - 2}
            textAnchor="end"
            className="fill-foreground-muted text-[8px] font-data"
          >
            4/4
          </text>

          {/* Bars */}
          {history.map((day, i) => {
            const x = 8 + i * (barWidth + gap);
            const ratio = day.total_meals > 0 ? day.completed_meals / day.total_meals : 0;
            const barHeight = Math.max(2, ratio * chartHeight);
            const y = paddingTop + (chartHeight - barHeight);

            // Day label from the date
            const date = new Date(day.date + "T00:00:00");
            const dayLabel = DAY_LABELS[(date.getDay() + 6) % 7];
            const isToday = i === history.length - 1;

            // Color based on completion
            let fill = "var(--color-surface-elevated)"; // no data
            if (day.completed_meals > 0) {
              if (ratio >= 1) fill = "var(--color-teal)";
              else if (ratio >= 0.5) fill = "var(--color-amber)";
              else fill = "var(--color-teal)";
            }

            return (
              <g key={day.date}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={4}
                  fill={fill}
                  opacity={day.completed_meals > 0 ? (ratio >= 1 ? 1 : 0.6) : 0.2}
                />

                {/* Completion count */}
                {day.completed_meals > 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 4}
                    textAnchor="middle"
                    className="fill-foreground-muted text-[9px] font-data"
                  >
                    {day.completed_meals}
                  </text>
                )}

                {/* Day label */}
                <text
                  x={x + barWidth / 2}
                  y={paddingTop + chartHeight + 16}
                  textAnchor="middle"
                  className={cn(
                    "text-[10px] font-data",
                    isToday ? "fill-teal font-bold" : "fill-foreground-muted"
                  )}
                >
                  {dayLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
