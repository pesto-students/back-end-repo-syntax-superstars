
const mongoose = require('mongoose');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.mongoose.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
