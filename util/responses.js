const success = body => buildResponse(200, body);

const failure = body => buildResponse(500, body);

const buildResponse = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
});

export {
  success,
  failure,
};