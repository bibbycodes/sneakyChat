require('dotenv').config();

const { Client } = require('pg')

class dbConnection {
  constructor() {
    this.password = process.env.DB_PASS;
    this.port = process.env.DB_PORT;

    if (process.env.NODE_ENV == "TEST"){
      console.log("testing")
      this.user = process.env.DB_USER_LOCAL;
      this.db_name = process.env.TEST_DB_NAME;
      this.db_ip = "localhost"
      this.uri = `postgres://${this.user}@${this.db_ip}:${this.port}/${this.db_name}`;
    } else if (process.env.NODE_ENV == "DEVELOPMENT") {
      console.log("development")
      this.user = process.env.DB_USER_LOCAL;
      this.db_name = process.env.DB_NAME;
      this.db_ip = "localhost"
      this.uri = `postgres://${this.user}@${this.db_ip}:${this.port}/${this.db_name}`;
    } else if (process.env.NODE_ENV == "PRODUCTION") {
      console.log("production")
      this.user = process.env.DB_USER;
      this.db_name = process.env.DB_NAME;
      this.db_ip = process.env.DB_IP;
      this.uri = `postgres://${this.user}:${this.password}@${this.db_ip}:${this.port}/${this.db_name}`;
    }
    this.client = new Client(this.uri)
  }

  start() {
    this.client.connect()
  }

  close() {
    this.client.end()
  }

  query(query) {
    this.client.query(query)
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