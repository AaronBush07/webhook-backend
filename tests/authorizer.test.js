const authorizer = require("../lambdas/authorizer");

describe("Test authorizer", () => {
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
