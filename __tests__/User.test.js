const User = require('../models/User')
const Helper = require('../test_helpers/test_helpers')
process.env.NODE_ENV = 'TEST'

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

  describe('.find', () => {
    it('retrieves a user from the database', async () => {
      let result = await User.find(1)
      expect(result[0].first).toEqual('Robert')
    })

    it('returns [] if a user doesnt exist', async () => {
      expect(await User.find(0)).toEqual([])
    })
  })

  describe('.create', () => {
    it('creates a new user', async () => {
      let user = await User.create('Thomas', 'Griffith', 'tom@gmail.com', 'secret')
      expect(user instanceof User).toBe(true)
    })

    it('adds a user to the database', async () => {
      await User.create('Robert', 'Rosiji', 'rob@gmail.com', 'secret')
      let user = await User.find(5)
      expect(user[0].first).toEqual('Robert')
      expect(user[0].last).toEqual('Rosiji')
      expect(user[0].email).toEqual('rob@gmail.com')
      expect(user[0].password).toEqual('secret')
    })
  })

  describe('.authenticate', () => {
    it('returns the user', async () => {
      let user = await User.create('Joe', 'Griffith', 'joe@gmail.com', 'testpass')
      expect(await User.authenticate('joe@gmail.com', 'testpass')).toEqual(user)
    })

    it('returns undefined if the password is incorrect', async () => {
      let user = await User.create('Joe', 'Griffith', 'joe@gmail.com', 'testpass')
      expect(await User.authenticate('joe@gmail.com', 'wrongpass')).toEqual(undefined)
    })
  })
})