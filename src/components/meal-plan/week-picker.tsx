"use client";


interface WeekPickerProps {
  weekStart: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onCurrentWeek: () => void;
  isCurrentWeek: boolean;
}

function formatDateRange(monday: Date): string {
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short" });
  const startMonth = monthFmt.format(monday);
  const endMonth = monthFmt.format(sunday);

  if (startMonth === endMonth) {
    return `${startMonth} ${monday.getDate()} – ${sunday.getDate()}`;
  }
  return `${startMonth} ${monday.getDate()} – ${endMonth} ${sunday.getDate()}`;
}

export function WeekPicker({
  weekStart,
  onPrevWeek,
  onNextWeek,
  onCurrentWeek,
  isCurrentWeek,
}: WeekPickerProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={onPrevWeek}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-surface-elevated transition-colors"
        aria-label="Previous week"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-foreground-muted">
          <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-semibold text-foreground font-data">
          {formatDateRange(weekStart)}
        </span>
        {!isCurrentWeek && (
          <button
            onClick={onCurrentWeek}
            className="text-[10px] text-teal hover:text-teal-light transition-colors"
          >
            Today
          </button>
        )}
      </div>

      <button
        onClick={onNextWeek}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-surface-elevated transition-colors"
        aria-label="Next week"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-foreground-muted">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
