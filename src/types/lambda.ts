export interface IEvent {
  source: string;
}

interface IJSON {
  [key: string]: any;
}

export type ICallback = (param1: any | null, response: IJSON | string) => void;

export type ILambdaFunc = (
  event: IEvent,
  context: {},
  callback: ICallback
) => void | ILambdaFunc;
