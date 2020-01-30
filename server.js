const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const dbconn = require("./dbConnection");
const Message = require("./models/message");
const User = require("./models/User");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const bodyParser = require("body-parser");          

let connections = [];

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/conversation/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Message.getConvo(id);
  res.status(200).json({ conversation: result });
});

app.post("/users/register", async (req, res) => {
  let username = req.body.username;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  let user = await User.create(username, firstName, lastName, email, password);
  let authenticated = await User.authenticate(email, password);

  if (authenticated instanceof User) {
    res.status(200).json({ user });
  } else {
    res.status(401);
  }
});

app.post("/users/authenticate", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.authenticate(email, password);
  console.log("H", user)
  if (user instanceof User) {
    res.status(200).json({ user: user });
  } else {
    res.status(401);
  }
});

app.post("/messages/", async (req, res) => {
  let query = req.query;
  let message = new Message(
    parseInt(query.sender_id), // be careful with parseInt and toString() keep consistent during flow of data
    query.body,
    parseInt(query.conversationId)
  );
  message.create();
  res.status(200).json({ status: "200" });
});

io.on("connection", function(socket) {
  connections.push({
    nameSpace: socket.nsp.name,
    sockets: socket.nsp.sockets,
    serverPath: socket.server._path,
    id: socket.id,
    clientId: socket.client.id,
    remoteAddress: socket.conn.remoteAddress,
    handshakeAddress: socket.handshake.address,
    handshakeQuery: socket.handshake.query,
    rooms: socket._rooms
  });

  console.log(`Client connected: ${connections.length} Connections`);
  console.log(connections);

  socket.on("send message", function(data) {
    console.log("A", data);
    let message = Message.create(
      data.body,
      parseInt(data.sender_id), // camel case this
      parseInt(data.conversationId)
    );
    console.log("B", message);

    io.sockets.emit("new message", data);
  });

  socket.on("disconnect", socket => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Client Disconnected: ${connections.length} Connections`);
    console.log(connections);
  });
});
