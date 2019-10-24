const viaHandler = async (functionPath, event) => {
    const handler = require(`../../src/functions/${functionPath}`);
    const response = await handler.handler(event);

    response.body = JSON.parse(response.body);

    return response;
}

module.exports.weInvokeHelloWorld = (name) => {
  const event = { pathParameters: { name: name } };
  
  return viaHandler('helloWorld', event);
}
