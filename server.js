const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbconn = require("./dbConnection")

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/messages', async (req, res) => {
  let db = new dbconn(1, "Hello", 1)
  let messages = await db.query("SELECT * FROM messages")
  console.log(messages)
  // res.json({ trip: trip.toObject({ getters: true }) });
  res.json({ messages: messages })
})