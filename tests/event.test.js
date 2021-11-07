const sevenEvent = require("../lambdas/event");
jest.mock("../utils/snsClient");
jest.mock("../utils/s3Client");
const s3Client = require("../utils/s3Client");
const snsClient = require("../utils/snsClient");

describe("Test Event", () => {
  test("Event should return 200 response if provided with payload", async () => {
    const event = {
      body: '{\n\n  "eventType": "ContentUpdate",\n\n  "message": {\n\n    "contentId": "NEWS21-001",\n    "extradata": "NEWS 24",\n    "moredata": "NEWS 111"\n\n  }\n\n}',
    };
    s3Client.mockImplementation(() => Promise.resolve("ok"));
    snsClient.mockImplementation(() => Promise.resolve("ok"));
    let result;
    await sevenEvent.handler(event, null, (n, response) => {
      result = response;
    });
    expect(result.statusCode).toBe(200);
  });

  test("Event should return 400 response if provided with no payload", async () => {
    const event = {};
    s3Client.mockImplementation(() => Promise.resolve("ok"));
    snsClient.mockImplementation(() => Promise.resolve("ok"));
    let result;
    await sevenEvent.handler(event, null, (n, response) => {
      result = response;
    });
    expect(result.statusCode).toBe(400);
  });
});
