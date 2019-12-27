const Connection = require('../dbConnection')

describe('dbConnection', () => {
  const db = new Connection()
  describe('#findMessageById', () => {
    it('returns the body of a given message', async () => {
      let result = await db.findMessageById(1)
      expect(result).toEqual("Hey you!")
    })
  })
})