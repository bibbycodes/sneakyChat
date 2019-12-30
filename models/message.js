const dbConnection = require('../dbConnection')

class Message {
  constructor(sender, body, conversationId) {
    this.db = new dbConnection()
    this.senderId = sender.id
    this.body = body
    this.conversationId = conversationId
  }

  async find(id) {
    let result = await this.db.query(
      `SELECT * FROM messages WHERE id=${id}`
    )
    return result.rows
  }

  async create() {
    let curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let result =  await this.db.query(
      `INSERT INTO messages 
      (body, sender_id, created_at, conversation_id) 
      VALUES ('${this.body}', '${this.senderId}', '${curDate}', '${this.conversationId}')
      RETURNING *;
      `
    )
    return result.rows;
  }

  async getConvo(id) {
    console.log("Getting Convo")
    let conversation = await this.db.query(`
    SELECT * FROM messages
    WHERE conversation_id=${id}
    ORDER BY created_at ASC;
    `)
    console.log(conversation.rows[0])
    return conversation.rows
  }
}

module.exports = Message