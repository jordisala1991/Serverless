const when = require('./steps/when');

describe('When we invoke the GET /api/get-togethers endpoint', () => {
  beforeAll(() => {
    process.env.AWS_REGION = 'eu-west-1';
    process.env.getTogethersTableName = `${process.env.TEST_STAGE}-gettogethers`;
  });

  test('It should return the right greeting', async () => {
    const response = await when.weInvokeGetTogethers();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(8);

    response.body.forEach(getTogether => {
      expect(getTogether).toHaveProperty('id');
      expect(getTogether).toHaveProperty('name');
      expect(getTogether).toHaveProperty('description');
    });
  });
});