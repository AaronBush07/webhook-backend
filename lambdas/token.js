const jwt = require('jsonwebtoken')

module.exports.handler = (event, context, callback) => {
    
    const token = jwt.sign({clientId: "client"}, 'abc123');

    const response = {
        statusCode: 200, 
        body: JSON.stringify(token)
        };
    callback(null, response)
}