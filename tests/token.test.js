const token = require("../lambdas/token");

describe("Test authentication", () => {
  test("Should return a token", () => {
    const event = {
      body: "grant_type=client_credentials&client_id=external&client_secret=abc123",
    };
    let result;
    token.handler(event, null, (n, response) => {
      result = response;
    });
    expect(result.body).toBe("MTQ0XjJkZmQ5OTM5NDE5ZTZzNGZmZjI3");
  });

  test("Should return no token", () => {
    const event = {
      body: "grant_type=client_credentials&client_id=random&client_secret=abc123",
    };
    let result;
    token.handler(event, null, (n, response) => {
      result = response;
    });
    expect(result.body).toBeFalsy();
  });
});
