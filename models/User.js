const dbConnection = require('../dbConnection')

class User {
  constructor(id, first, last) {
    this.id = id
    this.first = first
    this.last = last
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
    let user = new User(rows[0].id, rows[0].first, rows[0].last, rows[0].email)
    // console.log("b", user)
    return user
  }

  static async authenticate(email, password) {
    let db = new dbConnection()
    await db.start()
    let result = await db.query(`
      SELECT * FROM users
      WHERE email='${email}' AND password='${password}';
    `)
    let user = result.rows[0]
    await db.close()
    if (user) {
      return new User(user.id, user.first, user.last)
    }
  }
}

module.exports = User