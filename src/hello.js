import { successResponse, runWarm } from './utils';

const hello = (event, context, callback) => {
  // successResponse handles wrapping the response in an API Gateway friendly
  // format (see other responses, including CORS, in `./utils/lambda-response.js)
  const response = successResponse({
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event,
  });

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// runWarm function handles pings from the scheduler so you don't
// have to put that boilerplate in your function.
export default runWarm(hello);
