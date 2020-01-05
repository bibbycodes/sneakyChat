const dbConnection = require('../dbConnection')

class Message {
<<<<<<< HEAD
  constructor(senderId, body, conversationId, username) {
=======
  constructor(sender_id, body, conversationId) {
>>>>>>> c2d8bc2f5c05a837d1427069770ac4ff6eab965b
    this.id = null
    this.sender_id = sender_id
    this.body = body
    this.conversationId = conversationId
    this.username = username 
    console.log("username",this.username)
  }

  static async find(id) {
    let db = new dbConnection()
    await db.start()
    let result = await db.query(
      `SELECT * FROM messages WHERE id=${id}`
    )
    await db.close()
    return result.rows
  }

  

  async create() {
    let db = new dbConnection()
    let curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await db.start()
    let result =  await db.query(
      `INSERT INTO messages 
<<<<<<< HEAD
      (username, body, sender_id, created_at, conversation_id) 
      VALUES ('${this.username}','${this.body}', '${this.senderId}', '${curDate}', '${this.conversationId}')
=======
      (body, sender_id, created_at, conversation_id) 
      VALUES ('${this.body}', '${this.sender_id}', '${curDate}', '${this.conversationId}')
>>>>>>> c2d8bc2f5c05a837d1427069770ac4ff6eab965b
      RETURNING *;
      `
    )
    console.log("RESULT",result)
    this.id = result.rows[0].id

    await db.close()
    return result.rows;
  }

  static async getConvo(id) {
    let db = new dbConnection()
    await db.start()
    let conversation = await db.query(`
    SELECT * FROM messages
    WHERE conversation_id=${id}
    ORDER BY created_at ASC;
    `)
    await db.close()
    return conversation.rows
  }
}

module.exports = Message