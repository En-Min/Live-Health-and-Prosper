"use client";

import { cn } from "@/lib/utils";
import type { GroceryListItem } from "@/types/grocery";

interface GroceryItemProps {
  item: GroceryListItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function GroceryItem({ item, onToggle, onRemove }: GroceryItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 py-2.5 px-1",
        "border-b border-border/30 last:border-b-0"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        className={cn(
          "shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors",
          "min-w-[44px] min-h-[44px] -m-2.5 p-2.5", // expanded touch target
          item.is_checked
            ? "border-teal bg-teal"
            : "border-border hover:border-teal/50"
        )}
        aria-label={item.is_checked ? `Uncheck ${item.name}` : `Check ${item.name}`}
      >
        {item.is_checked && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-white">
            <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Item details */}
      <div className={cn("flex-1 min-w-0", item.is_checked && "opacity-50")}>
        <p
          className={cn(
            "text-sm text-foreground",
            item.is_checked && "line-through text-foreground-muted"
          )}
        >
          {item.name}
        </p>
        <p className="text-[10px] font-data text-foreground-muted">
          {item.quantity > 0 && (
            <span>{item.quantity}{item.unit}</span>
          )}
          {item.is_custom && (
            <span className="ml-1.5 text-amber">(custom)</span>
          )}
        </p>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground-muted hover:text-error transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label={`Remove ${item.name}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </div>
  );
}
