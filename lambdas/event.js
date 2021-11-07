const s3Client = require('../utils/s3Client')
const snsClient = require('../utils/snsClient');

module.exports.handler = async (event, context, callback) => {
    const response = {
        statusCode: 200, 
        body: JSON.stringify({
            message: 'Event Submitted'
        }),
    };
    let payload; 
    if (event?.body) {
        try{
            payload = JSON.parse(event.body)
        } catch (err) {
            console.log(err);
            response.statusCode = 400;
        }
    }
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