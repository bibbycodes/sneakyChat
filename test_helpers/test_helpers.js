const dbConnection = require('../dbConnection')
const fs = require('fs')
cwd = process.cwd()

class test_helper {
  constructor() {
    this.db = new dbConnection()
    this.insertMessages = fs.readFileSync(`${cwd}/db/migrations/message/03_insert_into_messages.sql`).toString()
    this.createMessagesTable = fs.readFileSync(`${cwd}/db/migrations/message/02_create_table_messages.sql`).toString()
  }

  async populateMessagesTable() {
    try {
      return await this.db.query(this.insertMessages)
    } catch (err) {
      console.error(err)
    }
  }

  async dropTable(tableName) {
    try {
      this.db.query(`DROP TABLE ${tableName};`)
    } catch (err){
      console.error(err)
    }
  }

  async createTableMessages() {
    try {
      return await this.db.query(this.createMessagesTable)
    } catch (err) {
      console.error(err)
    }
  }
}


module.exports = test_helper