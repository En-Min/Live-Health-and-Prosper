# Live Health & Prosper

A mobile-first Progressive Web App for biohacking-inspired meal planning, built around Bryan Johnson's Blueprint protocol. Science-backed recipes meet a "Lab Meets Kitchen" dark UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?logo=googlechrome)

---

## Features

**Recipe Library** — 12 Blueprint-inspired recipes with full nutrition data, step-by-step instructions, science notes with citations, and curated food photography.

**Meal Planner** — Drag-and-drop weekly meal planning with dnd-kit. Blueprint Week template for quick starts. Daily and weekly nutrition tracking bars.

**Grocery List** — Auto-generated from your meal plan. Grouped by grocery aisle, with check-off progress tracking and custom item support.

**Daily Tracking** — Log meals by slot (breakfast/lunch/dinner/snack), view weekly nutrition charts (SVG), and track streaks.

**Supplement Schedule** — Bryan Johnson's full supplement protocol organized by time of day, with dosage details and purpose descriptions.

**Profile** — Calorie targets, dietary preferences, and personalized settings.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript + React 19 |
| Styling | Tailwind CSS v4 (`@theme inline`) |
| Auth + DB | Supabase (PostgreSQL + RLS) |
| PWA | Serwist v9 |
| Drag & Drop | dnd-kit |
| Deploy | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server (Turbopack)
npm run dev

# Production build (uses --webpack for Serwist compatibility)
npm run build
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000). No Supabase setup is required for local development — the app uses seed data and localStorage for all state.

### Optional: Supabase

To enable cloud auth and persistence, create a `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Database migrations are in `supabase/migrations/`.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Public pages (login/signup)
│   ├── (main)/          # Authenticated shell (Header + BottomNav)
│   │   ├── recipes/     # Recipe library + detail pages
│   │   ├── meal-plan/   # Weekly drag-and-drop planner
│   │   ├── grocery-list/ # Auto-generated grocery list
│   │   ├── tracking/    # Daily meal logging + charts
│   │   ├── supplements/ # Supplement schedule
│   │   └── profile/     # User preferences
│   └── sw.ts            # Service worker (Serwist)
├── components/
│   ├── ui/              # Design system (Badge, Card, Button, etc.)
│   ├── recipes/         # RecipeCard, NutritionDashboard, ScienceCard
│   ├── meal-plan/       # WeekCalendar, DayColumn, MealSlot
│   ├── grocery/         # GrocerySection, GroceryItem, GroceryProgress
│   ├── tracking/        # MealLogEntry, WeeklyNutritionChart, StreakCounter
│   └── layout/          # Header, BottomNav
├── data/seed/           # 12 recipes, 50 ingredients, supplements
├── hooks/               # Custom React hooks (use-recipes, use-grocery-list, etc.)
├── lib/                 # Utilities, Supabase client, constants
└── types/               # TypeScript interfaces
```

## Design

Dark theme with a laboratory-meets-kitchen aesthetic:

- **Navy** `#0f172a` background, **Charcoal** `#1e293b` surfaces
- **Teal** `#14b8a6` primary accent, **Amber** `#f59e0b` secondary
- Monospace numbers (`.font-data`), serif recipe text (`.font-narrative`)
- 44px minimum touch targets for mobile

## Local Storage

All client state persists across sessions without requiring a backend:

| Key | Data |
|-----|------|
| `lhp-meal-plans` | Meal plan entries keyed by week |
| `lhp-grocery-list` | Grocery list items |
| `lhp-tracking` | Tracking logs keyed by date |
| `lhp-preferences` | Calorie target + dietary preferences |

## License

MIT
