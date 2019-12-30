const dbConnection = require('../dbConnection')

class Message {
  constructor(sender, body, conversationId) {
    this.db = new dbConnection()
    this.senderId = sender.id
    this.body = body
    this.conversation_id = conversationId
  }

  async find(id) {
    let result = await this.db.query(
      `SELECT * FROM messages WHERE id=${id}`
    )
    return result
  }

  async create() {
    return await this.db.query(
      `INSERT INTO messages (body, sender_id, created_at, conversation_id) 
      VALUES (${this.body}, ${this.senderId}, ${Date.now()}, ${this.conversationId})`
    )
  }

  async getConvo(user1, user2) {
    let sent = await this.db.query(
      `SELECT * FROM messages 
      WHERE sender_id=${user1} 
      AND recipient_id=${user2}
      ORDER BY created_at ASC`
    )
    let received = await this.db.query(
      `SELECT * FROM messages 
      WHERE sender_id=${user2} 
      AND recipient_id=${user1}
      ORDER BY created_at ASC`
    )

    sent = sent.rows
    received = received.rows
    let messages = (sent.concat(received))
    messages.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
    return messages
  }
}

module.exports = Message