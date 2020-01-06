const Message = require("../models/message");
const Helper = require("../test_helpers/test_helpers");
process.env.NODE_ENV = "TEST";

describe("Message", () => {
  let helper = new Helper();
  let sender = {username: 'RobertR', name: "Robert", id: 1 };

  beforeAll(async () => {
    await helper.createTableMessages();
    await helper.populateMessagesTable();
  });

  afterAll(async () => {
    await helper.dropTable("messages");
  });

  describe("#find", () => {
    it("returns a given message", async () => {
      let result = await Message.find(1);
      expect(result[0].body).toEqual("Hey you!");
    });
  });

  describe("#getConvo", () => {
    it("returns an array of messages between two users", async () => {
      let result = await Message.getConvo(1);
      expect(result[0].body).toEqual("Hey you!");
      expect(result[1].body).toEqual("Hey Girl!");
      expect(result[2].body).toEqual("Love You!");
    });
  });

  describe("#create", () => {
    it("adds a message into the database", async () => {
      await Message.create("Hi", "Zaira_R", 3, 1);
      result = await Message.find(4);
      console.log("G", result)

      expect(result[0].body).toEqual("Hi");
      expect(result[0].username).toEqual("Zaira_R");
      expect(result[0].sender_id).toEqual(3);
      expect(result[0].conversation_id).toEqual(1);
    });
  });
});
