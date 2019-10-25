const AWSXray = require('aws-xray-sdk');
const AWS = AWSXray.captureAWS(require('aws-sdk'));
const middy = require('middy');
const { ssm } = require('middy/middlewares');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = async (event, context) => {
  const request = {
    TableName: context.tableName,
    Limit: 8
  };

  const response = await dynamoDB.scan(request).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items)
  };
};

module.exports.handler = middy(handler).use(
  ssm({
    cache: true,
    cacheExpiryInMillis: 3 * 60 * 1000,
    setToContext: true,
    names: {
      tableName: `${process.env.getTogethersTablePath}`
    }
  })
);
