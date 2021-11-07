const token = require("../lambdas/token");
const authorizer = require("../lambdas/authorizer");

describe("Basic test", () => {
  test("Jest", () => {
    expect(1).toBe(1);
  });
});

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

  test("Should authenticate when given the correct token", () => {
    const event = {
      authorizationToken: "Bearer MTQ0XjJkZmQ5OTM5NDE5ZTZzNGZmZjI3",
    };
    const context = {
      awsRequestId: 1,
    };
    let result;
    authorizer.handler(event, context, (n, response) => {
      result = response;
    });
    expect(result.policyDocument.Statement[0].Effect).toBe("Allow");
  });

  test("Should not authenticate when given the incorrect token", () => {
    const event = {
      authorizationToken: "Bearer abc123",
    };
    const context = {
      awsRequestId: 1,
    };
    let result;
    authorizer.handler(event, context, (n, response) => {
      result = response;
    });
    expect(result.policyDocument.Statement[0].Effect).toBe("Deny");
  });
});
