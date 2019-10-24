module.exports.handler = async (event, context) => {
  const name = event.pathParameters.name;

  return {
      statusCode: 200,
      body: JSON.stringify(`Hello ${name}`)
  }
}
