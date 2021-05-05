import hello from './hello';
import context from './test/utils/handler-helper';
import event from '../fixtures/event.json';

const callback = jest.fn();

describe('hello', () => {
  it('executes as expected', async () => {
    const response = await hello(event, context, callback);
    expect(response).toMatchSnapshot();
  });
});
