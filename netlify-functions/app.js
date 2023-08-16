const server = require('../src/server');

exports.handler = async (event, context) => {
  const response = await server(event, context);
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body),
  };
};