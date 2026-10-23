CREATE TABLE IF NOT EXISTS events (
  event_id TEXT PRIMARY KEY, created_ms INTEGER NOT NULL,
  received_ms INTEGER NOT NULL, product_id INTEGER NOT NULL,
  event_type TEXT NOT NULL, transaction_hash TEXT NOT NULL,
  state TEXT NOT NULL, value_cents INTEGER, currency TEXT,
  test_event INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_events_transaction ON events(transaction_hash,created_ms);
