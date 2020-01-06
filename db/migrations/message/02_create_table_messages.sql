CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  body VARCHAR(5000),
  username VARCHAR(60),
  sender_id INTEGER,
  conversation_id INTEGER,
  created_at TIMESTAMP
  );