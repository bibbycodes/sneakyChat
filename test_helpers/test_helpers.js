const dbConnection = require('../dbConnection')
const fs = require('fs')
cwd = process.cwd()

class test_helper {
  constructor() {
    this.insertMessages = fs.readFileSync(`${cwd}/db/migrations/message/03_insert_into_messages.sql`).toString()
    this.createMessagesTable = fs.readFileSync(`${cwd}/db/migrations/message/02_create_table_messages.sql`).toString()
    this.createUsersTable = fs.readFileSync(`${cwd}/db/migrations/user/01_create_users_table.sql`).toString()
    this.insertUsers = fs.readFileSync(`${cwd}/db/migrations/user/02_insert_into_users.sql`).toString()
  }

  async populateMessagesTable() {
    try {
      let db = new dbConnection()
      await db.start()
      let result = await db.query(this.insertMessages)
      await db.close()
      return result
    } catch (err) {
      console.error(err)
    }
  }

  async populateUsersTable() {
    try {
      let db = new dbConnection()
      await db.start()
      let result = await db.query(this.insertUsers)
      await db.close()
      return result
    } catch (err) {
      console.error(err)
    }
  }

  async dropTable(tableName) {
    try {
      let db = new dbConnection()
      await db.start()
      db.query(`DROP TABLE ${tableName};`)
      await db.close()
    } catch (err){
      console.error(err)
    }
  }

  async createTableMessages() {
    try {
      let db = new dbConnection()
      await db.start()
      let result = await db.query(this.createMessagesTable)
      await db.close()
      return result
    } catch (err) {
      console.error(err)
    }
  }

  async createTableUsers() {
    try {
      let db = new dbConnection()
      await db.start()
      let result = await db.query(this.createUsersTable)
      await db.close()
      return result
    } catch (err) {
      console.error(err)
    }
  }
}


module.exports = test_helper