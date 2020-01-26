# sneakyChat
An encrypted chat client

# How To Use:

# Setup:

- Navigate to the root directory and run ```npm install```
- Navigate to the client Directory and run ```npm install```
- In the command line type in `psql` 
- At this point Create the necessary databse and tables:

```
CREATE DATABASE sneakyChat;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(60),
  first VARCHAR(60),
  last VARCHAR(60),
  email VARCHAR(255),
  password VARCHAR(255),
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
 CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  body VARCHAR(5000),
  username VARCHAR(60),
  sender_id INTEGER,
  conversation_id INTEGER,
  created_at TIMESTAMP
  );
```

- From Here you can navigate back to the root directory and run `node server.js`
- Then cd into the Client Directory and run `npm start`
- Go to localhost:3000 in your favorite browser, sign up with a friend and start chatting!
