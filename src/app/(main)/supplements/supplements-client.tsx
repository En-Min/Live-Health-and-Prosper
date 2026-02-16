"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { SUPPLEMENT_SCHEDULE, PROTOCOL_STATS } from "@/data/seed/supplements";
import type { BlueprintProduct, Supplement } from "@/types/supplement";

const TIME_ICONS: Record<string, string> = {
  Morning: "sunrise",
  Noon: "sun",
  Evening: "moon",
};

const TIME_COLORS: Record<string, string> = {
  Morning: "text-amber",
  Noon: "text-teal",
  Evening: "text-subtle",
};

const TIME_BG: Record<string, string> = {
  Morning: "bg-amber/10 border-amber/20",
  Noon: "bg-teal/10 border-teal/20",
  Evening: "bg-slate/50 border-slate/30",
};

function SunriseIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
    </svg>
  );
}

function TimeIcon({ type, className }: { type: string; className?: string }) {
  const icon = TIME_ICONS[type];
  if (icon === "sunrise") return <SunriseIcon className={className} />;
  if (icon === "sun") return <SunIcon className={className} />;
  return <MoonIcon className={className} />;
}

function ProductCard({ product }: { product: BlueprintProduct }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "w-full text-left rounded-lg border transition-all duration-200 min-h-[44px] p-3",
        expanded
          ? "border-teal/30 bg-teal/5"
          : "border-border bg-surface hover:border-teal/20"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{product.name}</h4>
          <p className="text-xs text-foreground-muted mt-0.5">
            {product.servingSize} &middot; {product.servingsPerDay}x/day
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-data text-teal bg-teal/10 px-1.5 py-0.5 rounded">
            {product.ingredients.length} ingredients
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className={cn(
              "w-4 h-4 text-foreground-muted transition-transform duration-200",
              expanded && "rotate-180"
            )}
          >
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 space-y-1">
          <p className="text-xs text-foreground-muted font-narrative mb-2">
            {product.description}
          </p>
          <div className="border-t border-border/50 pt-2">
            {product.ingredients.map((ing, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2 py-1.5",
                  i < product.ingredients.length - 1 && "border-b border-border/30"
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xs font-medium text-foreground">{ing.name}</span>
                    <span className="text-[10px] font-data text-teal">{ing.dosage}</span>
                    {ing.dailyValuePercent && (
                      <span className="text-[9px] font-data text-foreground-muted">({ing.dailyValuePercent} DV)</span>
                    )}
                  </div>
                  <p className="text-[11px] text-foreground-muted leading-snug mt-0.5">{ing.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

function SupplementRow({ supplement }: { supplement: Supplement }) {
  const isMed = supplement.type === "medication";
  return (
    <div className={cn(
      "flex items-start gap-3 py-2 px-3 rounded-lg",
      isMed ? "bg-error/5 border border-error/10" : "bg-surface"
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full mt-1.5 shrink-0",
        isMed ? "bg-error/60" : "bg-teal/60"
      )} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xs font-medium text-foreground">{supplement.name}</span>
          <span className="text-[10px] font-data text-teal">{supplement.dosage}</span>
        </div>
        <p className="text-[11px] text-foreground-muted leading-snug mt-0.5">{supplement.purpose}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {isMed && (
            <span className="text-[9px] font-data text-error/80 bg-error/10 px-1 py-0.5 rounded">Rx</span>
          )}
          {supplement.brand && (
            <span className="text-[9px] font-data text-foreground-muted">{supplement.brand}</span>
          )}
          {supplement.frequency && (
            <span className="text-[9px] font-data text-foreground-muted italic">{supplement.frequency}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SupplementsClient() {
  return (
    <div className="px-4 py-6 pb-24 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Supplement Protocol</h1>
        <p className="text-sm text-foreground-muted mt-1">
          Bryan Johnson&apos;s Blueprint supplement stack — organized by time of day
        </p>
      </div>

      {/* Protocol Overview Stats */}
      <Card variant="outlined">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-data font-bold text-teal">{PROTOCOL_STATS.totalDailyPills}</p>
              <p className="text-[10px] text-foreground-muted">pills/day</p>
            </div>
            <div>
              <p className="text-lg font-data font-bold text-amber">{PROTOCOL_STATS.blueprintProducts}</p>
              <p className="text-[10px] text-foreground-muted">Blueprint products</p>
            </div>
            <div>
              <p className="text-lg font-data font-bold text-foreground">{PROTOCOL_STATS.dailyCost}</p>
              <p className="text-[10px] text-foreground-muted">per day</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-foreground-muted">Eating window:</span>
              <span className="text-xs font-data text-teal">{PROTOCOL_STATS.eatingWindow}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-foreground-muted">Fasting:</span>
              <span className="text-xs font-data text-teal">{PROTOCOL_STATS.fastingHours} hrs</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-teal/60" />
          <span className="text-foreground-muted">Supplement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-error/60" />
          <span className="text-foreground-muted">Prescription (Rx)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-teal bg-teal/10 px-1 py-0.5 rounded font-data">n</span>
          <span className="text-foreground-muted">Expandable</span>
        </div>
      </div>

      {/* Time Sections */}
      {SUPPLEMENT_SCHEDULE.map((slot) => {
        const totalItems = slot.blueprintProducts.length + slot.supplements.length;
        return (
          <section key={slot.label} className="space-y-3">
            {/* Time Header */}
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-xl border",
              TIME_BG[slot.label]
            )}>
              <TimeIcon type={slot.label} className={cn("w-6 h-6", TIME_COLORS[slot.label])} />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <h2 className={cn("text-lg font-bold", TIME_COLORS[slot.label])}>
                    {slot.label}
                  </h2>
                  <span className="text-xs font-data text-foreground-muted">{slot.time}</span>
                </div>
                <p className="text-[11px] text-foreground-muted leading-snug mt-0.5">
                  {slot.description}
                </p>
              </div>
              <span className="text-xs font-data text-foreground-muted shrink-0">
                {totalItems} items
              </span>
            </div>

            {/* Blueprint Products (expandable) */}
            {slot.blueprintProducts.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-teal uppercase tracking-wider px-1 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657L9.25 18.693z" />
                  </svg>
                  Blueprint Products
                </h3>
                {slot.blueprintProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Individual Supplements + Medications */}
            {slot.supplements.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider px-1">
                  {slot.supplements.some((s) => s.type === "medication")
                    ? "Supplements & Medications"
                    : "Additional Protocols"}
                </h3>
                {slot.supplements.map((supplement, i) => (
                  <SupplementRow key={i} supplement={supplement} />
                ))}
              </div>
            )}
          </section>
        );
      })}

      {/* Disclaimer */}
      <Card variant="outlined" className="border-amber/20">
        <CardContent className="pt-3 pb-3">
          <div className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber shrink-0 mt-0.5">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.345 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-amber">Disclaimer</p>
              <p className="text-[11px] text-foreground-muted leading-relaxed mt-1">
                This protocol is for educational reference only. Several items are prescription medications (Rx) that require a doctor.
                Bryan Johnson frequently updates his stack based on biomarker testing. Consult a healthcare provider before starting any supplement regimen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
