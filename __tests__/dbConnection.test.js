const dbConnection = require('../dbConnection')

describe('dbConnection', () => {
  let db = new dbConnection()
  beforeAll(() => {
    db.start()
  })

  afterAll(() => {
    db.close()
  })

  describe('#findMessageById', () => {
    it('returns the body of a given message', async () => {
      let result = await db.findMessageById(1)
      expect(result).toEqual("Hey you!")
    })
  })

  describe('#getConversation', () => {
    it('returns an array of messages between two users', async () => {
      let result = await db.getConvo(1, 2)
      expect(result[0].body).toEqual("Hey you!")
      expect(result[1].body).toEqual("Hey Girl!")
      expect(result[2].body).toEqual("Love You!")
    })
  })
})