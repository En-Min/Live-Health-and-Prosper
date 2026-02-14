"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ScienceNote } from "@/types/recipe";

interface ScienceCardProps {
  notes: ScienceNote[];
}

export function ScienceCard({ notes }: ScienceCardProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!notes || notes.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber">
          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
        </svg>
        <h3 className="text-sm font-semibold text-amber uppercase tracking-wider">
          Why This Works
        </h3>
      </div>
      {notes.map((note, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <button
            key={index}
            onClick={() => setExpandedIndex(isExpanded ? null : index)}
            className={cn(
              "w-full text-left rounded-lg border transition-all duration-200",
              "min-h-[44px] p-3",
              isExpanded
                ? "border-amber/30 bg-amber/5"
                : "border-border bg-surface hover:border-amber/20"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-medium text-foreground">
                {note.title}
              </h4>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={cn(
                  "w-4 h-4 text-foreground-muted shrink-0 mt-0.5 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              >
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </div>
            {isExpanded && (
              <div className="mt-2 space-y-2">
                <p className="text-sm text-foreground-muted font-narrative leading-relaxed">
                  {note.content}
                </p>
                {note.citation && (
                  <p className="text-xs text-muted font-mono italic">
                    {note.citation}
                  </p>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
