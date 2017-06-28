import { successResponse } from './utils/lambda-response';

const hello = (event, context, callback) => {
  const response = {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event,
  };

  callback(null, successResponse(response));

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

export default hello;
