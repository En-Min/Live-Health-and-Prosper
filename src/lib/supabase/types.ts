export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          dietary_preferences: string[] | null;
          calorie_target: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          dietary_preferences?: string[] | null;
          calorie_target?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          dietary_preferences?: string[] | null;
          calorie_target?: number;
          updated_at?: string;
        };
      };
      ingredients: {
        Row: {
          id: string;
          name: string;
          category: string;
          grocery_aisle: string;
          calories_per_100g: number;
          protein_per_100g: number;
          carbs_per_100g: number;
          fat_per_100g: number;
          fiber_per_100g: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          grocery_aisle: string;
          calories_per_100g: number;
          protein_per_100g: number;
          carbs_per_100g: number;
          fat_per_100g: number;
          fiber_per_100g: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          category?: string;
          grocery_aisle?: string;
          calories_per_100g?: number;
          protein_per_100g?: number;
          carbs_per_100g?: number;
          fat_per_100g?: number;
          fiber_per_100g?: number;
        };
      };
      recipes: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          category: string;
          difficulty: string;
          prep_time_minutes: number;
          cook_time_minutes: number;
          servings: number;
          image_url: string | null;
          instructions: Json;
          science_notes: Json | null;
          tags: string[];
          total_calories: number;
          total_protein: number;
          total_carbs: number;
          total_fat: number;
          total_fiber: number;
          is_blueprint: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          category: string;
          difficulty: string;
          prep_time_minutes: number;
          cook_time_minutes?: number;
          servings?: number;
          image_url?: string | null;
          instructions: Json;
          science_notes?: Json | null;
          tags?: string[];
          total_calories: number;
          total_protein: number;
          total_carbs: number;
          total_fat: number;
          total_fiber: number;
          is_blueprint?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          slug?: string;
          description?: string;
          category?: string;
          difficulty?: string;
          prep_time_minutes?: number;
          cook_time_minutes?: number;
          servings?: number;
          image_url?: string | null;
          instructions?: Json;
          science_notes?: Json | null;
          tags?: string[];
          total_calories?: number;
          total_protein?: number;
          total_carbs?: number;
          total_fat?: number;
          total_fiber?: number;
          is_blueprint?: boolean;
        };
      };
    };
  };
}
