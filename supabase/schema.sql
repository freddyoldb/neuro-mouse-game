CREATE TABLE IF NOT EXISTS world_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  mouse_x INTEGER NOT NULL,
  mouse_y INTEGER NOT NULL,
  mouse_alive BOOLEAN NOT NULL,
  cat_x INTEGER NOT NULL,
  cat_y INTEGER NOT NULL,
  survival_time INTEGER NOT NULL DEFAULT 0,
  best_record INTEGER NOT NULL DEFAULT 0,
  run_id INTEGER NOT NULL DEFAULT 1,
  current_pattern TEXT NOT NULL DEFAULT 'none',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS word_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT NOT NULL UNIQUE,
  pattern TEXT NOT NULL,
  strength INTEGER NOT NULL DEFAULT 1,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS world_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO world_state (id, mouse_x, mouse_y, mouse_alive, cat_x, cat_y, survival_time, best_record, run_id, current_pattern)
VALUES (1, 5, 5, true, 15, 15, 0, 0, 1, 'none')
ON CONFLICT (id) DO NOTHING;
