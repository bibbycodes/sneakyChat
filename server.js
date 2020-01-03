const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const dbconn = require("./dbConnection")
const Message = require("./models/message")
const User = require("./models/User")
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)
const bodyParser = require('body-parser')


let connections = []

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// console.log that your server is up and running

server.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/conversation/:id', async (req, res) => {
  console.log("hello")
  let id = req.params.id
  console.log(id)
  let db = new dbconn()
  await db.start()
  result = await db.query(`SELECT * FROM messages WHERE conversation_id=${id}`)
  res.status(200).json({ conversation: result.rows })
})

app.post('/authenticate', async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let user = await User.authenticate(email, password)
  if (user instanceof User) {
    res.status(200).json({data : "Authenticated"})
  } else {
    res.send(user)
  }
})

app.post('/messages/', async (req, res) => {
  let query = req.query
  let message = new Message(parseInt(query.senderId), query.body, parseInt(query.conversationId))
  message.create()
  res.status(200).json({"status" : "200"})
})

io.on('connection', function(socket){
  connections.push({
    nameSpace : socket.nsp.name,
    sockets : socket.nsp.sockets,
    serverPath : socket.server._path,
    id : socket.id,
    clientId : socket.client.id,
    remoteAddress : socket.conn.remoteAddress,
    handshakeAddress : socket.handshake.address,
    handshakeQuery : socket.handshake.query,
    rooms : socket._rooms
  })
  
  console.log(`Client connected: ${connections.length} Connections`)
  console.log(connections)

  socket.on('send message', function(data) {
    let message = new Message(parseInt(data.senderId), data.body, parseInt(data.conversationId))
    message.create()
    io.sockets.emit('new message', data)
  })
  
  socket.on("disconnect", (socket) => {
    connections.splice(connections.indexOf(socket), 1)
    console.log(`Client Disconnected: ${connections.length} Connections`)
    console.log(connections)
  });
})