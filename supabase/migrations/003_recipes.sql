-- Recipes table
create table public.recipes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text not null default '',
  category text not null,
  difficulty text not null default 'Easy',
  prep_time_minutes integer not null default 0,
  cook_time_minutes integer not null default 0,
  servings integer not null default 1,
  image_url text,
  instructions jsonb not null default '[]',
  science_notes jsonb,
  tags text[] default '{}',
  total_calories numeric(7,2) not null default 0,
  total_protein numeric(7,2) not null default 0,
  total_carbs numeric(7,2) not null default 0,
  total_fat numeric(7,2) not null default 0,
  total_fiber numeric(7,2) not null default 0,
  is_blueprint boolean not null default false,
  created_at timestamptz default now() not null
);

-- Recipe ingredients join table
create table public.recipe_ingredients (
  id uuid default gen_random_uuid() primary key,
  recipe_id uuid references public.recipes(id) on delete cascade not null,
  ingredient_id uuid references public.ingredients(id) on delete restrict not null,
  quantity numeric(7,2) not null,
  unit text not null,
  preparation text,
  sort_order integer not null default 0
);

-- Enable RLS
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;

-- Public read access
create policy "Recipes are publicly readable"
  on public.recipes for select
  using (true);

create policy "Recipe ingredients are publicly readable"
  on public.recipe_ingredients for select
  using (true);

-- Indexes
create index idx_recipes_slug on public.recipes (slug);
create index idx_recipes_category on public.recipes (category);
create index idx_recipes_is_blueprint on public.recipes (is_blueprint);
create index idx_recipes_title on public.recipes using gin (to_tsvector('english', title));
create index idx_recipe_ingredients_recipe on public.recipe_ingredients (recipe_id);
create index idx_recipe_ingredients_ingredient on public.recipe_ingredients (ingredient_id);
