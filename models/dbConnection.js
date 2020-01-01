require('dotenv').config();

const { Client } = require('pg')

class dbConnection {
  constructor() {
    this.password = process.env.DB_PASS;
    this.port = process.env.DB_PORT;

    if (process.env.NODE_ENV == "TEST"){
      this.user = process.env.DB_USER_LOCAL;
      this.db_name = process.env.TEST_DB_NAME;
      this.db_ip = "localhost"
      this.uri = `postgres://${this.user}@${this.db_ip}:${this.port}/${this.db_name}`;
    } else if (process.env.NODE_ENV == "DEVELOPMENT") {
      this.user = process.env.DB_USER_LOCAL;
      this.db_name = process.env.DB_NAME;
      this.db_ip = "localhost"
      this.uri = `postgres://${this.user}@${this.db_ip}:${this.port}/${this.db_name}`;
    } else if (process.env.NODE_ENV == "PRODUCTION") {
      this.user = process.env.DB_USER;
      this.db_name = process.env.DB_NAME;
      this.db_ip = process.env.DB_IP;
      this.uri = `postgres://${this.user}:${this.password}@${this.db_ip}:${this.port}/${this.db_name}`;
    }
    this.client = new Client(this.uri)
  }

  async end() {
    await this.client.end()
  }

  async connect() {
    await this.client.connect()
  }

  async query(query) {
    try {
      await this.client.connect()
      let result = await this.client.query(query)
      await this.client.end()
      return result
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = dbConnection;