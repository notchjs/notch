import { expect } from 'chai';
import * as sinon from 'sinon';

import { NotchHandlerMiddleware } from '../../../src';
import { NormalHandler } from '../fixtures/normal-handler';

describe('NotchHandlerMiddleware', () => {
  it('should produce response when process call', () => {
    const middleware = new NotchHandlerMiddleware(new NormalHandler());
    expect(middleware.process(sinon.spy(), sinon.spy(), sinon.spy())).to.equal(
      'foo',
    );
  });
});
