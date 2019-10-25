const http = require('http');
const AWSXray = require('aws-xray-sdk');
const AWS = AWSXray.captureAWS(require('aws-sdk'));
const middy = require('middy');
const { ssm } = require('middy/middlewares');
const FunctionShield = require('@puresec/function-shield');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

FunctionShield.configure({
  policy: {
    outbound_connectivity: 'alert',
    read_write_tmp: 'block',
    create_child_process: 'block',
    read_handler: 'block'
  },
  token: process.env.functionShieldToken
});

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
