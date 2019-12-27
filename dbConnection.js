require('dotenv').config();

user = process.env.DB_USER;
db_name = process.env.DB_NAME;
password = process.env.DB_PASS;
port = process.env.DB_PORT;
instance = process.env.DB_INSTANCE;
db_ip = process.env.DB_IP;
const uri = `postgres://${user}:${password}@${db_ip}:${port}/${db_name}`;

const { Client } = require('pg')
const client = new Client(uri)
client.connect()

client.query('SELECT * FROM messages', (err, res) => {
  if (err) {
    console.log(err)
  } else {
    console.log("connecting")
    console.log(res)
    client.end()
  }
})