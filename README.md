TEST_BASE_URL=https://det2a5mgz9.execute-api.eu-west-1.amazonaws.com/dev/ TEST_STAGE=dev yarn test:acceptance

AWS_PROFILE=serverless-local TEST_BASE_URL=https://det2a5mgz9.execute-api.eu-west-1.amazonaws.com/dev/ TEST_STAGE=dev yarn test:integration

AWS_PROFILE=serverless-local TEST_STAGE=dev node seedGetTogethers.js gettogethers

yarn deploy --aws-profile serverless-local
