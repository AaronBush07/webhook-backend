module.exports.handler = (event, context, callback) => {
  console.log(event);
  const body = new URLSearchParams(event.body);
  let token = "";
  let response;
  console.log(event, body);
  if (
    body &&
    body.get("grant_type") === "client_credentials" &&
    body.get("client_id") === "external" &&
    body.get("client_secret") === "abc123"
  ) {
    token = "MTQ0XjJkZmQ5OTM5NDE5ZTZzNGZmZjI3";
    response = {
      statusCode: 200,
      body: token,
    };
  } else {
    response = {
      statusCode: 403,
    };
  }
  callback(null, response);
};
