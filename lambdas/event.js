const s3Client = require('../utils/s3Client')
const snsClient = require('../utils/snsClient');

module.exports.handler = async (event, context, callback) => {
    const response = {
        statusCode: 200, 
        body: JSON.stringify({
            message: 'Event Submitted'
        }),
    };
    console.log(event)
    const payload = JSON.parse(event.body)
    if (payload) {
        console.log('Adding to s3');
        await s3Client(payload);
        await snsClient(payload);
    }
    else {
        response.statusCode = 400
        response.body = JSON.stringify({message: 'Missing payload'})
    }
    
    callback(null, response)
}