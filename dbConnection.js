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
    console.log(this.uri)
    this.client = new Client(this.uri)
  }

  start() {
    this.client.connect()
    console.log("starting db")
  }

  close() {
    this.client.end()
    console.log("closing db")
  }

  async query(query) {
    return await this.client.query(query)
  }
}

module.exports = dbConnection;