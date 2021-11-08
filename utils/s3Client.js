const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const {utcToZonedTime, format} = require("date-fns-tz");
// Create S3 service object.
const s3Client = new S3Client();
let body = [];

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

async function publishEvent(payload) {
  /**Fix to inconsistent dates */
  const d = format(utcToZonedTime(new Date(), 'Australia/Sydney'), "yyyyMMdd");
  let fileExists = false;
  try {
    const params = {
      Bucket: process.env.CF_S3Bucket,
      Key: `event-notifications-${d}.json`,
    };
    const data = await s3Client.send(new GetObjectCommand(params));

    fileExists = true;
    body = JSON.parse(await streamToString(data.Body));
  } catch (err) {
    console.log(err);
  }

  /**Push payload onto either the new array or the received array */
  body.push(payload);
  try {
    const params = {
      Bucket: process.env.CF_S3Bucket,
      Key: `event-notifications-${d}.json`,
      Body: JSON.stringify(body),
      ContentType: "application/json",
      ACL: 'public-read'
    };
    /**Overwrite existing file */
    const data = await s3Client.send(new PutObjectCommand(params));
    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = publishEvent;
