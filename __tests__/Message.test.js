const Message = require('../models/message')
const Helper = require('../test_helpers/test_helpers')
process.env.NODE_ENV = "TEST"

describe('Message', () => {
  let helper = new Helper()
  let user = { name: "Robert", id: 1 }
  let message = new Message(user, "Hello", 1)

  beforeAll(async () => {
    await helper.db.start()
    await message.db.start()
    await helper.createTableMessages()
    await helper.populateMessagesTable()
  })

  afterAll(async () => {
    message.db.close()
      .then(() => helper.dropTable('messages'))
      .then(() => helper.db.close())
  })

  describe('#find', () => {
    it('returns the body of a given message', async () => {
      let result = await message.find(1)
      expect(result.rows[0].body).toEqual("Hey you!")
    })
  })

  describe('#getConversation', () => {
    it('returns an array of messages between two users', async () => {
      let result = await message.getConvo(1, 2)
      expect(result[0].body).toEqual("Hey you!")
      expect(result[1].body).toEqual("Hey Girl!")
      expect(result[2].body).toEqual("Love You!")
    })
  })

  describe('#create', () => {
    it('adds a message into the database', async () => {
      await message.create()
      result = await message.find(4)
      expect(result[3].body).toEqual("Hello")
    })
  })
})