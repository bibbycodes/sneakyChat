const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbconn = require("./dbConnection")
const Message = require("./models/message")

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/conversation/:id', async (req, res) => {
  let id = req.params.id
  let db = new dbconn()
  await db.start()
  result = await db.query(`SELECT * FROM messages WHERE conversation_id=${id}`)
  res.status(200).json({ conversation: result.rows })
})

app.post('/messages/', async (req, res) => {
  let query = req.query
  let message = new Message(parseInt(query.senderId), query.body, parseInt(query.conversationId))
  message.create()
  res.status(200).json({"status" : "200"})
})