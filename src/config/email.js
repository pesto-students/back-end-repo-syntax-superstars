
const nodemailer = require('nodemailer');
const config = require("./config");

const sendEmail = (req, res, user) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: config.email.smtp.auth.user,
          pass: config.email.smtp.auth.pass,
      }
  });
    
  const mailConfigurations = {
    
      // It should be a string of sender/server email
      from: config.email.from,
    
      to: user.email,
    
      // Subject of Email
      subject: 'Email Verification',
        
      // This would be the text of email body
      text: 'Hello '+ user.firstName +',\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + req.headers.host + '\/api/auth/verify-email\/' + user.token + '\n\nThank You!\n'
        
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