const runWarm = lambdaFunc => (event, context, callback) => {
  // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
  // lambda function running hot.
  if (event.source === 'aws.events') {
    return callback(null, 'pinged');
  }

  return lambdaFunc(event, context, callback);
};

export default runWarm;
