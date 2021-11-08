module.exports.handler = (event, context, callback) => {
  let token = "";
  let response;
  try {
    const body = new URLSearchParams(event.body);
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
  } catch (err) {
    console.log(err);
    response = {
      statusCode: 403,
    };
  }

  callback(null, response);
};
