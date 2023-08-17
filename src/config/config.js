require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: 2000,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  email: {
    smtp: {
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
  prepostseo: {
    api_key: process.env.API_KEY,
    api_url: process.env.API_URL,
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
  },
  app_domain: process.env.APP_DOMAIN,
};