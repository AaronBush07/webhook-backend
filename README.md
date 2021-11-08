# Notes

This project uses Serverless Framework to deploy to AWS. 

At the moment, you should only be able to run `npm test` as other scripts rely on having serverless configs setup to run. 

The endpoints used in this repository are currently live.

In order to submit an event you need the mocked access token which can be requested from 
- https://0hhw3cqvjh.execute-api.ap-southeast-2.amazonaws.com/dev/oauth/token
after sending a POST request with body populated with 
`grant_type=client_credentials&client_id=external&client_secret=abc123`. 

This will return a mocked token which you can use as your bearer token. Of course you can always copy/paste the token found in `authorizer.js`. 


You can then send events via POST method to the following endpoint. 
- https://0hhw3cqvjh.execute-api.ap-southeast-2.amazonaws.com/dev/sevenevent

Sending this event publishes to an SNS topic as well as populates the s3 daily file. 

You may then view the file on the front end. 


Other issues I've come across I can discuss. 


