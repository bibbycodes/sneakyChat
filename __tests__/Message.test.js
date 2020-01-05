const Message = require('../models/message')
const Helper = require('../test_helpers/test_helpers')
process.env.NODE_ENV = "TEST"

describe('Message', () => {
  let helper = new Helper()
  let sender = { name: "Robert", id: 1 }
    let message = new Message("Hi", 'Robert R', sender.id, 1)
console.log("Message", message)
  beforeAll(async () => {
    await helper.createTableMessages()
    await helper.populateMessagesTable()
  })

  afterAll(async () => {
    await helper.dropTable('messages')
  })

  describe('#find', () => {
    it('returns a given message', async () => {
      let result = await Message.find(1)
      expect(result[0].body).toEqual("Hey you!")
    })
  })

  describe('#getConvo', () => {
    it('returns an array of messages between two users', async () => {
      let result = await Message.getConvo(1)
      expect(result[0].body).toEqual("Hey you!")
      expect(result[1].body).toEqual("Hey Girl!")
      expect(result[2].body).toEqual("Love You!")
    })
  })

  describe('#create', () => {
    it('adds a message into the database', async () => {
      
      console.log("Message 2", message)
      await message.create()
      result = await Message.find(1)
      expect(result[0].body).toEqual("Hi")
    })
  })
})