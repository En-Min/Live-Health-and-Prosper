-- ============================================
-- Migration 005: Grocery Lists
-- ============================================

-- Grocery lists (optionally linked to a meal plan)
CREATE TABLE grocery_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE SET NULL,
  name TEXT NOT NULL DEFAULT 'Grocery List',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Grocery list items
CREATE TABLE grocery_list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grocery_list_id UUID NOT NULL REFERENCES grocery_lists(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT '',
  aisle TEXT NOT NULL DEFAULT 'Other',
  is_checked BOOLEAN NOT NULL DEFAULT false,
  is_custom BOOLEAN NOT NULL DEFAULT false,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_grocery_lists_user ON grocery_lists(user_id);
CREATE INDEX idx_grocery_lists_meal_plan ON grocery_lists(meal_plan_id);
CREATE INDEX idx_grocery_list_items_list ON grocery_list_items(grocery_list_id);
CREATE INDEX idx_grocery_list_items_aisle ON grocery_list_items(grocery_list_id, aisle);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_grocery_list_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER grocery_lists_updated_at
  BEFORE UPDATE ON grocery_lists
  FOR EACH ROW EXECUTE FUNCTION update_grocery_list_timestamp();

-- Row Level Security
ALTER TABLE grocery_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE grocery_list_items ENABLE ROW LEVEL SECURITY;

-- Users can only access their own grocery lists
CREATE POLICY "Users can view own grocery lists"
  ON grocery_lists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grocery lists"
  ON grocery_lists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own grocery lists"
  ON grocery_lists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own grocery lists"
  ON grocery_lists FOR DELETE
  USING (auth.uid() = user_id);

-- Items inherit access through the grocery list
CREATE POLICY "Users can view own grocery list items"
  ON grocery_list_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_list_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own grocery list items"
  ON grocery_list_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_list_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own grocery list items"
  ON grocery_list_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_list_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own grocery list items"
  ON grocery_list_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM grocery_lists
      WHERE grocery_lists.id = grocery_list_items.grocery_list_id
      AND grocery_lists.user_id = auth.uid()
    )
  );
