const AWSXray = require('aws-xray-sdk');

AWSXray.captureAWS(require('aws-sdk'));

const SNS = require('@dazn/lambda-powertools-sns-client')
const chance = require('chance').Chance();
const log = require('@dazn/lambda-powertools-logger');
const middy = require('middy');
const correlationIds = require('@dazn/lambda-powertools-middleware-correlation-ids');

const handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const message = {
    getTogetherId: parsedBody.getTogetherId,
    userEmail: parsedBody.userEmail,
    orderId: chance.guid()
  };

  await SNS.publish({
    Message: JSON.stringify(message),
    TopicArn: process.env.joinGetTogetherSnsTopic
  }).promise();

  log.info("published 'join_getTogether' event", message);

  return {
      statusCode: 200,
      body: JSON.stringify(message)
  }
};

module.exports.handler = middy(handler)
  .use(correlationIds({ sampleDebugLogRate: 0 }));
