const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'dkidv4wxq', 
  api_key: '517242925276948', 
  api_secret: 'ur_Ep6FyhZQ48CXXg7Db4Gh9uDg' 
});

module.exports = cloudinary;