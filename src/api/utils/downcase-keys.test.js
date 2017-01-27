import assert from 'assert';

import downcaseKeys from './downcase-keys';

describe('downcaseKeys', () => {
  it('downcases keys in a js object', () => {
    const obj = {
      Accept: 'foo',
      BAZ: 'BAT',
    }

    const downcaseObj = {
      accept: 'foo',
      baz: 'BAT',
    };

    assert.deepEqual(downcaseKeys(obj), downcaseObj);
  });
});
