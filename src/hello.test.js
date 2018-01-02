import hello from './hello';

describe('hello', () => {
  it('executes as expected', () => {
    const cb = jest.fn();
    hello({}, {}, cb);
    expect(cb).toBeCalled();
    expect(cb).toMatchSnapshot();
  });
});
