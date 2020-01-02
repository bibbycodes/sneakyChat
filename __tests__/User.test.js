const User = require('../models/User')
const Helper = require('../test_helpers/test_helpers')

describe('User', () => {
  let helper = new Helper()
  let user = new User()

  beforeAll(async () => {
    await helper.createTableUsers()
    await helper.populateUsersTable()
  })

  afterAll(async () => {
    await helper.dropTable('users')
  })

  // describe('#create', () => {
  //   let robert = User.create('Robert', 'Rosiji', 'test@gmail.com', 'password123', 'sneaky')

  // })

  describe('.find', () => {
    it('retrieves a user from the database', async () => {
      let result = await User.find(1)
      expect(result[0].first).toEqual("Robert")
    })
  })

  describe('.create', () => {
    it('creates a new user', async () => {
      let user = await User.create()
      expect(user instanceof User).toBe(true)
    })
  })
})