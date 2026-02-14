"use client";

import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  unit?: string;
  className?: string;
}

export function ProgressRing({
  value,
  max,
  size = 80,
  strokeWidth = 6,
  color = "text-teal",
  label,
  unit,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-surface-elevated"
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(color, "transition-all duration-500")}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-data text-sm font-bold text-foreground">
            {Math.round(value)}
          </span>
          {unit && (
            <span className="font-data text-[10px] text-foreground-muted">
              {unit}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className="text-xs text-foreground-muted font-medium">{label}</span>
      )}
    </div>
  );
}
