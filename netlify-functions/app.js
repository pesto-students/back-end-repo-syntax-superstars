const app = require('../src/server');

exports.handler = async (event, context) => {
  const response = await app(event, context);
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body),
  };
};