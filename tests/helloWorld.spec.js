const when = require('./steps/when');

describe('When we invoke the GET /helloWorld endpoint', () => {
  test('It should return the right greeting', async () => {
    const response = await when.weInvokeHelloWorld('Manolito');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello Manolito');
  });
});