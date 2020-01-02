const dbConnection = require('../dbConnection')

class User {
  constructor() {

  }

  static async find(id) {
    let db = new dbConnection()
    await db.start()
    let result = await db.query(`SELECT * FROM users WHERE id=${id}`)
    await db.close()
    return result.rows
  }

  static async create(first, last, email, password) {
    let db = new dbConnection()
    await db.start()
    let result = await db.query(`
      INSERT INTO 
      users (first, last, email, password) 
      VALUES ('${first}', '${last}', '${email}', '${password}')
      RETURNING *;
    `)
    let rows = result.rows
    await db.close()
    return new User(rows[0].first, rows[0].last, rows[0].email, rows[0].password)
  }
}

module.exports = User