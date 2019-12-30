CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  body VARCHAR(5000),
  sender_id INTEGER,
  conversation_id INTEGER,
  created_at TIMESTAMP
  );