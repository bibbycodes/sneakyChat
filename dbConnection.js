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
    this.db_name = process.env.TEST_DB_NAME;
    this.password = process.env.DB_PASS;
    this.port = process.env.DB_PORT;
    this.instance = process.env.DB_INSTANCE;
    this.db_ip = process.env.DB_IP;
    this.uri = `postgres://${this.user}:${this.password}@${this.db_ip}:${this.port}/${this.db_name}`;
    this.client = new Client(this.uri)
  }

  async findMessageById(id) {
    this.client.connect()
    let result = await this.client.query(
      `SELECT * FROM messages WHERE id=${id}`
    )
    this.client.end()
    return result.rows[0].body
  }
}

module.exports = dbConnection;