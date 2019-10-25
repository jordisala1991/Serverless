const AWSXray = require('aws-xray-sdk');

AWSXray.captureAWS(require('aws-sdk'));

const middy = require('middy');
const correlationIds = require('@dazn/lambda-powertools-middleware-correlation-ids');
const log = require('@dazn/lambda-powertools-logger');

const handler = async (event) => {
  const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

  log.info("notified dql 'join_getTogether'", { orderPlaced });

  return 'all done';
};

module.exports.handler = middy(handler)
  .use(correlationIds({ sampleDebugLogRate: 0 }));
