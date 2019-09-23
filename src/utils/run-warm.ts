const runWarm = (lambdaFunc: Function): AWSLambda.Handler => async (
  event,
  context
) => {
  // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
  // lambda function running hot.
  if (event.source === 'serverless-plugin-warmup') {
    return 'pinged';
  }

  return lambdaFunc(event, context);
};

export default runWarm;
