const multer = require('multer');
const AWS = require('../../config/aws-config'); // Import the AWS configuration

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadProfilePic = (req, res) => {
  try {
    upload.single('profilePic');
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'YOUR_BUCKET_NAME',
      Key: `profile-pics/${req.file.originalname}`,
      Body: req.file.buffer,
      ACL: 'public-read'
    };
  
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading file');
      }
  
      res.json({ imageUrl: data.Location });
    });
  } catch(err) {
    console.log(err);
  }
};

module.exports = uploadProfilePic;