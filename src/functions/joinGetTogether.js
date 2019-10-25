const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const chance = require('chance').Chance();

module.exports.handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const orderId = chance.guid();

  const params = {
    Message: JSON.stringify({
      getTogetherId: parsedBody.getTogetherId,
      userEmail: parsedBody.userEmail,
      orderId
    }),
    TopicArn: process.env.joinGetTogetherSnsTopic
  };
  
  const response = await sns.publish(params).promise();
  console.log(response);

  return {
      statusCode: 200,
      body: JSON.stringify({orderId})
  }
};
