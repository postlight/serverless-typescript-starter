import { successResponse, runWarm } from './utils';

const hello = (event, context, callback) => {
  const response = successResponse({
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event,
  });

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

export default runWarm(hello);
