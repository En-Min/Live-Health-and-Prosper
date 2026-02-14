-- Ingredients: master list with nutrition per 100g
create table public.ingredients (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  category text not null,
  grocery_aisle text not null,
  calories_per_100g numeric(7,2) not null default 0,
  protein_per_100g numeric(7,2) not null default 0,
  carbs_per_100g numeric(7,2) not null default 0,
  fat_per_100g numeric(7,2) not null default 0,
  fiber_per_100g numeric(7,2) not null default 0,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.ingredients enable row level security;

-- Public read access
create policy "Ingredients are publicly readable"
  on public.ingredients for select
  using (true);

-- Index for search
create index idx_ingredients_name on public.ingredients using gin (to_tsvector('english', name));
create index idx_ingredients_category on public.ingredients (category);
