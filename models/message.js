const dbConnection = require('../dbConnection')

class Message {
  constructor() {
    this.db = new dbConnection()
  }

  async findMessageById(id) {
    let result = await this.db.query(
      `SELECT * FROM messages WHERE id=${id}`
    )
    
    return result.rows[0].body
  }

  async getConvo(user1, user2) {
    let sent = await this.db.query(
      `SELECT * FROM messages WHERE sender_id=${user1} AND recipient_id=${user2}`
    )
    let received = await this.db.query(
      `SELECT * FROM messages WHERE sender_id=${user2} AND recipient_id=${user1}`
    )

    sent = sent.rows
    received = received.rows

    let messages = (sent.concat(received))
    messages.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)

    return messages
  }
}

module.exports = Message