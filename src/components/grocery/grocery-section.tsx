"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { GroceryListItem } from "@/types/grocery";
import type { GroceryAisle } from "@/lib/constants";
import { GroceryItem } from "./grocery-item";

const AISLE_ICONS: Partial<Record<GroceryAisle, string>> = {
  "Produce": "🥬",
  "Proteins": "🥩",
  "Dairy & Eggs": "🥚",
  "Grains & Bread": "🌾",
  "Nuts & Seeds": "🥜",
  "Oils & Condiments": "🫒",
  "Frozen": "🧊",
  "Spices & Herbs": "🌿",
  "Supplements": "💊",
  "Other": "📦",
};

interface GrocerySectionProps {
  aisle: GroceryAisle;
  items: GroceryListItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function GrocerySection({ aisle, items, onToggle, onRemove }: GrocerySectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  const checkedCount = items.filter((i) => i.is_checked).length;
  const allChecked = checkedCount === items.length;

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      {/* Section header — collapsible */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3",
          "hover:bg-surface-elevated/50 transition-colors min-h-[44px]"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{AISLE_ICONS[aisle] ?? "📦"}</span>
          <span
            className={cn(
              "text-sm font-semibold",
              allChecked ? "text-foreground-muted" : "text-foreground"
            )}
          >
            {aisle}
          </span>
          <span className="text-[10px] font-data text-foreground-muted">
            {checkedCount}/{items.length}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={cn(
            "w-4 h-4 text-foreground-muted transition-transform",
            collapsed && "-rotate-90"
          )}
        >
          <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Items list */}
      {!collapsed && (
        <div className="px-4 pb-2">
          {items.map((item) => (
            <GroceryItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
