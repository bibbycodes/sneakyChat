const dbConnection = require("../dbConnection");

class Conversation {
  constructor(conversationId) {
    this.id = null;
    this.conversationId = conversationId;
  }

  async getConvo(id) {
    let db = new dbConnection();
    await db.start();
    let conversation = await db.query(`
    SELECT * FROM messages
    WHERE conversation_id=${id}
    ORDER BY created_at ASC;
    `);
    await db.close();
    return conversation.rows ;
  }
}

module.exports = Conversation 