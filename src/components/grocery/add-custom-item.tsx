"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GROCERY_AISLES, type GroceryAisle } from "@/lib/constants";

interface AddCustomItemProps {
  onAdd: (name: string, quantity: number, unit: string, aisle: GroceryAisle) => void;
}

export function AddCustomItem({ onAdd }: AddCustomItemProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [aisle, setAisle] = useState<GroceryAisle>("Other");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd(name.trim(), parseFloat(quantity) || 0, unit.trim(), aisle);
    setName("");
    setQuantity("");
    setUnit("");
    setAisle("Other");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl border border-dashed border-border text-sm text-foreground-muted hover:border-teal/30 hover:text-teal transition-colors min-h-[44px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
        </svg>
        Add custom item
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-teal/30 bg-surface p-4 space-y-3"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          autoFocus
          className="flex-1 rounded-lg bg-surface-elevated border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent min-h-[44px]"
        />
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Qty"
          step="any"
          min="0"
          className="w-20 rounded-lg bg-surface-elevated border border-border px-3 py-2 text-sm font-data text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent min-h-[44px]"
        />
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit (g, ml...)"
          className="w-28 rounded-lg bg-surface-elevated border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent min-h-[44px]"
        />
        <select
          value={aisle}
          onChange={(e) => setAisle(e.target.value as GroceryAisle)}
          className="flex-1 rounded-lg bg-surface-elevated border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent min-h-[44px]"
        >
          {GROCERY_AISLES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
        >
          Add Item
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm text-foreground-muted hover:text-foreground rounded-lg hover:bg-surface-elevated transition-colors min-h-[44px]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
