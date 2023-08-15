
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendEmail = (req, res, user) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });
    
  const mailConfigurations = {
    
      // It should be a string of sender/server email
      from: 'archnaarang20@gmail.com',
    
      to: user.email,
    
      // Subject of Email
      subject: 'Email Verification',
        
      // This would be the text of email body
      text: 'Hello '+ user.firstName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/verify-email\/' + user.token + '\n\nThank You!\n'
        
  };
    
  transporter.sendMail(mailConfigurations, function(error){
      if (error) {
        console.log(error);
        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
      }
      return res.status(200).send({message: 'A verification email has been sent to ' + user.email + '.' });
  });
};

module.exports = sendEmail;