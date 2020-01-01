const dbConnection = require('../dbConnection')

class Message {
  constructor(senderId, body, conversationId) {
    this.id = null
    // this.db = new dbConnection()
    this.senderId = senderId
    this.body = body
    this.conversationId = conversationId
  }

  async find(id) {
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
      (body, sender_id, created_at, conversation_id) 
      VALUES ('${this.body}', '${this.senderId}', '${curDate}', '${this.conversationId}')
      RETURNING *;
      `
    )
    console.log(result.rows)
    this.id = result.rows[0].id
    await db.close()
    return result.rows;
  }

  async getConvo(id) {
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