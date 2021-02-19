import { successResponse, runWarm } from './utils';
import { Response } from './utils/lambda-response';

const hello = async (event: AWSLambda.APIGatewayEvent): Promise<Response> => {
  // successResponse handles wrapping the response in an API Gateway friendly
  // format (see other responses, including CORS, in `./utils/lambda-response.ts)
  const response = successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });

  return response;
};

// runWarm function handles pings from the scheduler so you don't
// have to put that boilerplate in your function.
export default runWarm(hello);
