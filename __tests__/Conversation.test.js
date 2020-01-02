const Message = require("../models/conversation");
const Helper = require("../test_helpers/test_helpers");
process.env.NODE_ENV = "TEST";

describe("Conversation", () => {
  let helper = new Helper();
  let sender = { name: "Shubs", id: 2 };
  let message = new Message(sender.id, "Shubs is the best", 2);

  beforeAll(async () => {
    await helper.db.start();
    // await message.db.start()
    await helper.createTableMessages();
    await helper.populateMessagesTable();
  });

  afterAll(async () => {
    // await message.db.close()
    await helper.dropTable("messages");
    await helper.db.close();
  });

  describe("#getConvo", () => {
    it("returns an array of messages between two users", async () => {
      let result = await message.getConvo(1);
      expect(result[0].body).toEqual("Hey you!");
      expect(result[1].body).toEqual("Hey Girl!");
      expect(result[2].body).toEqual("Love You!");
    });
  });
});
