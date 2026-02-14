"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { DAYS_OF_WEEK } from "@/lib/constants";
import type { MealSlot } from "@/lib/constants";
import type { MealPlanEntry } from "@/types/meal-plan";
import type { Recipe } from "@/types/recipe";
import { DayColumn } from "./day-column";
import { getMondayOfWeek } from "@/hooks/use-meal-plan";

interface WeekCalendarProps {
  weekStart: Date;
  entries: (MealPlanEntry & { recipe?: Recipe })[];
  getSlotEntries: (day: number, slot: MealSlot) => (MealPlanEntry & { recipe?: Recipe })[];
  getDayNutrition: (day: number) => { calories: number; protein: number; carbs: number; fat: number; fiber: number };
  onRemoveEntry: (id: string) => void;
  onMoveEntry: (id: string, newDay: number, newSlot: MealSlot) => void;
  onAddClick: (day: number, slot: MealSlot) => void;
}

export function WeekCalendar({
  weekStart,
  entries,
  getSlotEntries,
  getDayNutrition,
  onRemoveEntry,
  onMoveEntry,
  onAddClick,
}: WeekCalendarProps) {
  const [activeEntry, setActiveEntry] = useState<(MealPlanEntry & { recipe?: Recipe }) | null>(null);

  // Configure sensors for both pointer and touch
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 5 },
  });
  const sensors = useSensors(pointerSensor, touchSensor);

  // Determine today's day-of-week (0=Mon based)
  const today = new Date();
  const currentMonday = getMondayOfWeek(today);
  const isThisWeek = weekStart.getTime() === currentMonday.getTime();
  const todayDow = isThisWeek ? ((today.getDay() + 6) % 7) : -1; // Convert Sun=0 to Mon=0

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const entry = entries.find((e) => e.id === event.active.id);
      if (entry) setActiveEntry(entry);
    },
    [entries]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveEntry(null);
      const { active, over } = event;
      if (!over) return;

      // Parse droppable ID: "dayOfWeek-mealSlot"
      const overId = String(over.id);
      const parts = overId.split("-");
      if (parts.length < 2) return;

      const newDay = parseInt(parts[0], 10);
      const newSlot = parts.slice(1).join("-") as MealSlot;

      if (isNaN(newDay)) return;

      const entryId = String(active.id);
      const entry = entries.find((e) => e.id === entryId);
      if (!entry) return;

      // Only move if target is different
      if (entry.day_of_week !== newDay || entry.meal_slot !== newSlot) {
        onMoveEntry(entryId, newDay, newSlot);
      }
    },
    [entries, onMoveEntry]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
        {DAYS_OF_WEEK.map((_, index) => (
          <DayColumn
            key={index}
            dayOfWeek={index}
            isToday={index === todayDow}
            getSlotEntries={getSlotEntries}
            dayNutrition={getDayNutrition(index)}
            onRemoveEntry={onRemoveEntry}
            onAddClick={(day, slot) => onAddClick(day, slot)}
          />
        ))}
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeEntry?.recipe && (
          <div className="rounded-lg bg-surface-elevated border border-teal/30 p-2 shadow-lg shadow-teal/10 opacity-90 w-[260px]">
            <p className="text-xs font-medium text-foreground truncate">
              {activeEntry.recipe.title}
            </p>
            <p className="text-[10px] font-data text-teal">
              {Math.round(activeEntry.recipe.total_calories)} kcal
            </p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
