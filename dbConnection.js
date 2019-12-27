require('dotenv').config();

const { Client } = require('pg')
// client.query('SELECT * FROM messages', (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("connecting")
//     console.log(res)
//     client.end()
//   }
// })

class dbConnection {
  constructor() {
    this.user = process.env.DB_USER;
    this.db_name = process.env.TEST_DB_NAME || process.env.DB_NAME;
    this.password = process.env.DB_PASS;
    this.port = process.env.DB_PORT;
    this.instance = process.env.DB_INSTANCE;
    this.db_ip = process.env.DB_IP;
    this.uri = `postgres://${this.user}:${this.password}@${this.db_ip}:${this.port}/${this.db_name}`;
    this.client = new Client(this.uri)
  }

  start() {
    this.client.connect()
  }

  close() {
    this.client.end()
  }

  async findMessageById(id) {
    let result = await this.client.query(
      `SELECT * FROM messages WHERE id=${id}`
    )
    return result.rows[0].body
  }

  async getConvo(user1, user2) {
    let sent = await this.client.query(
      `SELECT * FROM messages WHERE sender_id=${user1} AND recipient_id=${user2}`
    )
    let received = await this.client.query(
      `SELECT * FROM messages WHERE sender_id=${user2} AND recipient_id=${user1}`
    )

    sent = sent.rows
    received = received.rows

    let messages = (sent.concat(received))
    messages.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)

    return messages
  }
}

module.exports = dbConnection;