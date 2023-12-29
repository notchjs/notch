import { expect } from 'chai';
import * as sinon from 'sinon';

import { MiddlewareDecorator } from '../../../src';

describe('MiddlewareDecorator', () => {
  it('should produce response when process call', () => {
    const middleware = (req: any, res: any): string => 'foo';
    const decorator = new MiddlewareDecorator(middleware);
    expect(decorator.process(sinon.spy(), sinon.spy(), sinon.spy())).to.equal(
      'foo',
    );
  });
});
