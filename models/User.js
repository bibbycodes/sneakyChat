const dbConnection = require('../dbConnection')

class User {
  constructor() {

  }

  static async find(id) {
    let db = new dbConnection()
    await db.start()
    let result = await db.query(`SELECT * FROM users WHERE id = ${id}`)
    await db.close()
    return result.rows
  }

  static async create() {
    return new User
  }
}

module.exports = User