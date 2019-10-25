const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.getTogethersTableName;

module.exports.handler = async () => {
  const request = {
    TableName: tableName,
    Limit: 8
  };

  console.log(request);

  const response = await dynamoDB.scan(request).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items)
  };
};