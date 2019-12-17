import hello from './hello';

describe('hello', () => {
  it('executes as expected', async () => {
    const response = await hello({});
    expect(response).toMatchSnapshot();
  });
});
