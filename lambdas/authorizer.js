const jwt = require('jsonwebtoken')

module.exports.handler = async (event, context, callback) => {
    let auth = 'Deny'
    let resource = process.env.IS_OFFLINE ? 'http://localhost:3000/dev/seven' : event.methodArn
    console.log('AUTHORIZATION', event)
    const {authorizationToken} = event
    let token = authorizationToken.replace(/^Bearer\s+/, '');
    console.log(token)
    await jwt.verify(token, 'abc123', (err, decoded) => {
        if(!err) {
            auth = 'Allow'
        }
        else {
            console.log(err)
        }
    });
    const policy = {
        "principalId": context.awsRequestId,
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "execute-api:Invoke",
                    "Effect": auth,
                    "Resource": resource
                }
            ]
        }

    }
    console.log(policy.policyDocument.Statement)
    callback(null, policy)
    

}