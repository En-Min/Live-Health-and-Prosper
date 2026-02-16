export interface SupplementIngredient {
  name: string;
  dosage: string;
  purpose: string;
  dailyValuePercent?: string;
}

export interface BlueprintProduct {
  id: string;
  name: string;
  servingSize: string;
  servingsPerDay: number;
  description: string;
  ingredients: SupplementIngredient[];
}

export interface Supplement {
  name: string;
  dosage: string;
  purpose: string;
  type: "supplement" | "medication";
  frequency?: string;
  brand?: string;
}

export interface TimeSlot {
  time: string;
  label: string;
  description: string;
  blueprintProducts: BlueprintProduct[];
  supplements: Supplement[];
}

export type SupplementSchedule = TimeSlot[];
