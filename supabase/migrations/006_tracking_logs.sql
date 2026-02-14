-- ============================================
-- Migration 006: Tracking Logs
-- ============================================

-- Daily meal completion tracking
CREATE TABLE tracking_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_slot TEXT NOT NULL CHECK (meal_slot IN ('breakfast', 'lunch', 'dinner', 'snack')),
  completed BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, date, meal_slot)
);

-- Indexes
CREATE INDEX idx_tracking_logs_user_date ON tracking_logs(user_id, date);
CREATE INDEX idx_tracking_logs_user_range ON tracking_logs(user_id, date DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_tracking_log_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tracking_logs_updated_at
  BEFORE UPDATE ON tracking_logs
  FOR EACH ROW EXECUTE FUNCTION update_tracking_log_timestamp();

-- Row Level Security
ALTER TABLE tracking_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tracking logs"
  ON tracking_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tracking logs"
  ON tracking_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tracking logs"
  ON tracking_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tracking logs"
  ON tracking_logs FOR DELETE
  USING (auth.uid() = user_id);
