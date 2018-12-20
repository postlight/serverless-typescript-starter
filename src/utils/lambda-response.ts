interface IJSON {
  [key: string]: any;
}

interface IResponseOptions {
  json: IJSON;
  statusCode: number;
  allowCORS?: boolean;
}

interface IResponse {
  statusCode: number;
  body: string;
  headers?: {
    [key: string]: any;
  };
}

function lambdaResponse({
  json,
  statusCode,
  allowCORS = false,
}: IResponseOptions) {
  const response: IResponse = {
    statusCode,
    body: JSON.stringify(json),
  };

  if (allowCORS) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
    };
  }

  return response;
}

export function errorResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 500,
  });
}

export function corsErrorResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 500,
    allowCORS: true,
  });
}

export function successResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 200,
  });
}

export function corsSuccessResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 200,
    allowCORS: true,
  });
}
