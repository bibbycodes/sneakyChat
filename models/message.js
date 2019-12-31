const dbConnection = require('../dbConnection')

class Message {
  constructor(senderId, body, conversationId) {
    this.db = new dbConnection()
    this.senderId = senderId
    this.body = body
    this.conversationId = conversationId
  }

  async find(id) {
    this.db.start()
    let result = await this.db.query(
      `SELECT * FROM messages WHERE id=${id}`
    )
    this.db.close()
    return result.rows
  }

  async create() {
    let curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.db.start()
    let result =  await this.db.query(
      `INSERT INTO messages 
      (body, sender_id, created_at, conversation_id) 
      VALUES ('${this.body}', '${this.senderId}', '${curDate}', '${this.conversationId}')
      RETURNING *;
      `
    )
    this.db.close()
    return result.rows;
  }

  async getConvo(id) {
    this.db.start()
    let conversation = await this.db.query(`
    SELECT * FROM messages
    WHERE conversation_id=${id}
    ORDER BY created_at ASC;
    `)
    this.db.close()
    return conversation.rows
  }
}

module.exports = Message