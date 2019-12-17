const runWarm = (lambdaFunc: Function): Function => async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any,
  context: AWSLambda.Context
): Promise<Response | string> => {
  // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
  // lambda function running hot.
  if (event.source === 'serverless-plugin-warmup') {
    return 'pinged';
  }

  return lambdaFunc(event, context);
};

export default runWarm;