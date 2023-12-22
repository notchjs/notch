import { expect } from 'chai';

import { Appliaction } from '../src';

describe('Application', () => {
  it('should return an instance of Application', () => {
    expect(new Appliaction()).to.be.instanceOf(Appliaction);
  });
});
