module.exports.handler = (event, context, callback) => {
  let auth = "Deny";
  let resource = process.env.IS_OFFLINE
    ? "http://localhost:3000/dev/sevenevent"
    : event.methodArn;
  const { authorizationToken } = event;
  let token = authorizationToken.replace(/^Bearer\s+/, "");
  if (token === "MTQ0XjJkZmQ5OTM5NDE5ZTZzNGZmZjI3") {
    auth = "Allow";
  }
  const policy = {
    principalId: context.awsRequestId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: auth,
          Resource: resource,
        },
      ],
    },
  };
  callback(null, policy);
};
