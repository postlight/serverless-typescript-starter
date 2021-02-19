const context = {
  awsRequestId: '',
  invokeid: '',
  logGroupName: '',
  logStreamName: '',
  functionVersion: '',
  isDefaultFunctionVersion: true,
  functionName: '',
  memoryLimitInMB: '0',
  succeed: jest.fn(),
  fail: jest.fn(),
  done: jest.fn(),
  getRemainingTimeInMillis: jest.fn(),
  callbackWaitsForEmptyEventLoop: true,
  invokedFunctionArn: '',
};

export default context;
