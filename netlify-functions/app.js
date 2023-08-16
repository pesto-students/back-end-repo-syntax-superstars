const express = require('express');
const api = require('../src/server'); // Path to your Express API code

const app = express();

app.use('/.netlify/functions/app', api);

module.exports = app;