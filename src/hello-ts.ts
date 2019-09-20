import { successResponse, runWarm } from './utils';

const helloTs: Function = async (event: AWSLambda.APIGatewayEvent) => {
  // successResponse handles wrapping the response in an API Gateway friendly
  // format (see other responses, including CORS, in `./utils/lambda-response.js)
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  return response;

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// runWarm function handles pings from the scheduler so you don't
// have to put that boilerplate in your function.
export default runWarm(helloTs);
