const dbConnection = require("../dbConnection");

class Message {
  constructor(id, sender_id, body, conversationId) {
    this.id = id;
    this.sender_id = sender_id;
    this.body = body;
    this.conversationId = conversationId;
  }

  static async find(id) {
    let db = new dbConnection();
    await db.start();
    let result = await db.query(`SELECT * FROM messages WHERE id=${id}`);
    await db.close();
    return result.rows;
  }

  async create() {
    let db = new dbConnection()
    let curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await db.start()
    let result =  await db.query(

      `INSERT INTO messages 
      (body, username, sender_id, created_at, conversation_id) 
      VALUES ('${body}', '${username}', '${sender_id}', '${curDate}', '${conversationId}')
      RETURNING *;
      `
    );
    await db.close();
    result = result.rows[0];
    return new Message(
      result.id,
      result.body,
      result.sender_id,
      result.conversationId
    );

  }

  static async getConvo(id) {
    let db = new dbConnection();
    await db.start();
    let conversation = await db.query(`
    SELECT * FROM messages
    WHERE conversation_id=${id}
    ORDER BY created_at ASC;
    `);
    await db.close();
    return conversation.rows;
  }
}

module.exports = Message;
