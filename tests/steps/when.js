const http = require('superagent');

const viaHandler = async (functionPath, event) => {
  const handler = require(`../../src/functions/${functionPath}`);
  const response = await handler.handler(event);

  response.body = JSON.parse(response.body);

  return response;
}

const viaHttp = async (path) => {
  const apiRoot = process.env.TEST_BASE_URL;

  try {
    const httpReq = http('get', `${apiRoot}/${path}`);
    const response = await httpReq;
  
    return {
      statusCode: response.status,
      body: response.body
    };
  } catch (error) {
    if (error.status) {
      return {
        statusCode: error.status
      };
    }

    throw error;
  }
}

module.exports.weInvokeGetTogethers = () => {
  const mode = process.env.TEST_MODE

  return mode == 'handler' ?
    viaHandler('getGetTogethers', {}) :
    viaHttp('api/get-togethers');
}
