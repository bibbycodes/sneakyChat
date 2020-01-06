const User = require('../models/User')
const Helper = require('../test_helpers/test_helpers')
process.env.NODE_ENV = 'TEST'

describe('User', () => {
  let helper = new Helper()

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

  describe('.findByEmail', () => {
    it('returns a users details if the user exists in the db', async () => {
      let result = await User.findByEmail("test@gmail.com")
      expect(result[0].email).toEqual("test@gmail.com")
    })

    it('returns [] if the user does not exist in the db', async () => {
      let result = await User.findByEmail("doesntexist@gmail.com")
      expect(result).toEqual([])
    })
  })

  describe('.check_exists', () => {
    it('returns true if a user exists in the db', async () => {
      expect(await User.check_exists("test@gmail.com")).toBe(true)
    })

    it('returns false if a user doesnt exist in the db', async () => {
      expect(await User.check_exists("blahblah@gmail.com")).toBe(false)
    })
  })

  describe('.create', () => {
    it('creates a new user', async () => {
      let user = await User.create('TGriffith','Thomas', 'Griffith', 'tomtom@gmail.com', 'secret')
      expect(user instanceof User).toBe(true)
    })

    it('adds a user to the database', async () => {
      await User.create('RobertR', 'Robert', 'Rosiji', 'rob@gmail.com', 'secret')
      let user = await User.find(5)
      expect(user[0].first).toEqual('Robert')
      expect(user[0].last).toEqual('Rosiji')
      expect(user[0].email).toEqual('rob@gmail.com')
      expect(user[0].password).toEqual('secret')
    })

    it('returns "user already exists" if the user already exists', async () => {
      expect(await User.create('Robert_R', 'Robert', 'Rosiji', 'test@gmail.com', 'secret'))
      .toEqual("user already exists")
    })
  })

  describe('.authenticate', () => {
    it('returns the user after successful authentication', async () => {
      let user = await User.create('Joe_G','Joe', 'Griffith', 'joe@gmail.com', 'testpass')
      console.log("D", user)
      let results = await User.authenticate('joe@gmail.com', 'tespass')
      console.log('E', results)
      expect(await User.authenticate('joe@gmail.com', 'testpass')).toEqual(user)

    })

    it('returns "Email or Password Incorrect" if the password is incorrect', async () => {
      await User.create('Joe', 'Griffith', 'joe@gmail.com', 'testpass')
      expect(await User.authenticate('joe@gmail.com', 'wrongpass')).toEqual("Email or Password Incorrect")
    })
  })
})