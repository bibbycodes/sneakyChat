const dbConnection = require("../dbConnection");

class User {
  constructor(username, id, first, last) {
    this.username = username;
    this.id = id;
    this.first = first;
    this.last = last;
  }

  static async find(id) {
    let db = new dbConnection();
    await db.start();
    let result = await db.query(`SELECT * FROM users WHERE id=${id}`);
    await db.close();
    return result.rows;
  }

  static async findByEmail(email) {
    let db = new dbConnection();
    await db.start();
    let result = await db.query(`SELECT * FROM users WHERE email='${email}'`);
    await db.close();
    return result.rows;
  }

  static async check_exists(email) {
    let user = await this.findByEmail(email);
    return !!user[0];
  }

  static async create(username, first, last, email, password) {
    let exists = await this.check_exists(email);
    if (exists) {
      return "user already exists";
    } else {
      let db = new dbConnection();
      await db.start();
      let result = await db.query(`
      INSERT INTO 
      users (username, first, last, email, password) 
      VALUES ('${username}', '${first}', '${last}', '${email}', '${password}')
      RETURNING *;
      `);
      let rows = result.rows;
      await db.close();
      return new User(
        rows[0].username,
        rows[0].id,
        rows[0].first,
        rows[0].last
      );
    }
  }

  static async authenticate(email, password) {
    let db = new dbConnection();
    await db.start();
    let result = await db.query(`
      SELECT * FROM users
      WHERE email='${email}' AND password='${password}';
    `);
    let user = result.rows[0];

    await db.close();
    if (user) {
      return new User(user.username, user.id, user.first, user.last);
    } else {
      return "Email or Password Incorrect";
    }
  }
}

module.exports = User;
