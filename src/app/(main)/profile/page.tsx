"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NUTRIENT_TARGETS } from "@/lib/constants";
import type { User } from "@supabase/supabase-js";

const PREFS_STORAGE_KEY = "lhp-preferences";

interface UserPreferences {
  calorieTarget: number;
  dietaryPreferences: string[];
}

const DIETARY_OPTIONS = [
  "Plant-Based",
  "Low-Carb",
  "High-Protein",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Blueprint Protocol",
] as const;

function loadPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return { calorieTarget: NUTRIENT_TARGETS.calories, dietaryPreferences: ["Blueprint Protocol"] };
  }
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { calorieTarget: NUTRIENT_TARGETS.calories, dietaryPreferences: ["Blueprint Protocol"] };
}

function savePreferences(prefs: UserPreferences) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [prefs, setPrefs] = useState<UserPreferences>(() => loadPreferences());
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  function updatePrefs(updated: Partial<UserPreferences>) {
    const newPrefs = { ...prefs, ...updated };
    setPrefs(newPrefs);
    savePreferences(newPrefs);
  }

  function toggleDietary(option: string) {
    const current = prefs.dietaryPreferences;
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    updatePrefs({ dietaryPreferences: updated });
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-surface-elevated rounded" />
          <div className="h-40 bg-surface-elevated rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-foreground-muted">Email</p>
            <p className="text-foreground font-mono text-sm">
              {user?.email ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground-muted">Display Name</p>
            <p className="text-foreground">
              {user?.user_metadata?.display_name ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground-muted">Member Since</p>
            <p className="text-foreground font-mono text-sm">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Calorie Target */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground-muted">
                Daily Calorie Target
              </label>
              <span className="text-sm font-data font-medium text-teal">
                {prefs.calorieTarget} kcal
              </span>
            </div>
            <input
              type="range"
              min={1200}
              max={3500}
              step={50}
              value={prefs.calorieTarget}
              onChange={(e) => updatePrefs({ calorieTarget: parseInt(e.target.value) })}
              className="w-full h-2 bg-surface-elevated rounded-full appearance-none cursor-pointer accent-teal"
            />
            <div className="flex justify-between text-[9px] font-data text-foreground-muted mt-1">
              <span>1200</span>
              <span>2000</span>
              <span>2800</span>
              <span>3500</span>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <p className="text-sm text-foreground-muted mb-2">
              Dietary Preferences
            </p>
            <div className="flex flex-wrap gap-2">
              {DIETARY_OPTIONS.map((option) => {
                const isActive = prefs.dietaryPreferences.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleDietary(option)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${
                      isActive
                        ? "bg-teal/20 text-teal border border-teal/30"
                        : "bg-surface-elevated text-foreground-muted border border-border hover:border-teal/30"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplement Protocol Link */}
      <Link
        href="/supplements"
        className="flex items-center gap-3 w-full p-4 rounded-xl bg-surface border border-border hover:border-teal/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal">
            <path d="M16.5 6a3 3 0 00-3-3H10.5a3 3 0 00-3 3v.75h9V6z" />
            <path fillRule="evenodd" d="M7.5 7.5v9A4.5 4.5 0 0012 21h0a4.5 4.5 0 004.5-4.5v-9h-9zm3 3a.75.75 0 011.5 0v1.5h1.5a.75.75 0 010 1.5H12v1.5a.75.75 0 01-1.5 0V13.5H9a.75.75 0 010-1.5h1.5V10.5z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Supplement Protocol</p>
          <p className="text-xs text-foreground-muted">Blueprint morning/noon/night stack</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-foreground-muted">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </Link>

      <Button
        variant="danger"
        className="w-full"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
}
