const axios = require("axios");
const cloudinary = require("../../config/cloudinary");
const uploadProfilePic = async (req, res) => {
  try {        
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const response = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
      });
      return res.status(200).send(response);

  } catch (error) {
    console.log(error);
  }
}

module.exports = uploadProfilePic;