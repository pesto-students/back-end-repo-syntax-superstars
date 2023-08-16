const axios = require("axios");
const FormData = require('form-data');
const textReadability = require('text-readability');
const Document = require("../../models/Document");
const Report = require("../../models/Report");
const User = require("../../models/User");
const config = require("../../config/config");

const addDocument = async(req,res) => {
  try {
    
    const { user } = req;
    
    if(!user){
      return res.status(401).send({ message: "User is not authorised."});
    }
    const { name, author, text, is_file, project, size, type} = req.body;
    
    let words_count = 0;
    let userData; 
    if (text) {
      words_count = await text.split(' ').length;
      userData = await User.findOne({ _id: user.userId});

      if (userData.creditsLeft > 0){
        const result = userData.creditsLeft - words_count;
        userData.creditsLeft = result > 0 ? result : 0;
      }
      await userData.save();
    }

    const document = await Document.create({
      name,
      author,
      text,
      is_file,
      project,
      words_count,
      file_type: type,
      file_size: size,
      user: user.userId,
    });

    const report = generateReport(text, document._id, user.userId);

    if(!document)
      return res.status(404).json({ message: "Document creation failed"});

    res.status(201).json({ document, userData, report });
  }catch(err) {
    console.log(err);
  }
};

const generateReport = async (text, documentId, userId) => {
  let data = new FormData();
  data.append('key', config.prepostseo.api_key);
  data.append('data', text);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: config.prepostseo.api_url,
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };

  axios.request(config)
    .then((response) => {
      if (response?.data) {
        const {plagPercent, paraphrasePercent, uniquePercent} = response.data;
        const readabilityScore = textReadability.fleschReadingEase(text);
        const report = Report.create({
          plagPercent,
          paraphrasePercent,
          uniquePercent,
          readabilityScore,
          document: documentId,
          user: userId,
        });

        return report;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = addDocument;