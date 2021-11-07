const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
// Set the AWS Region.
const REGION = "ap-southeast-2"; //e.g. "us-east-1"
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION });

async function publishSNS(payload) {
  console.log("ARN: ", process.env.CF_SNSTopic);

  try {
    const params = {
      Message: JSON.stringify(payload),
      TopicArn: process.env.CF_SNSTopic,
    };
    const data = await snsClient.send(new PublishCommand(params));
    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = publishSNS;
