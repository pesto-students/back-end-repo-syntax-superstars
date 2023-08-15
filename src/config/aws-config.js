const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'us-east-1' // Change to your desired region
});

module.exports = AWS;
