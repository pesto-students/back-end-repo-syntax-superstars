// netlify-functions/api.js
const api = require('../src/server');

let index = async (event, context) => {
  const response = await api(event, context);
  return {
    statusCode: 200,
    body: JSON.stringify({ data: response }),
  };
};

module.exports.handler = index;