import { expect } from 'chai';
import * as sinon from 'sinon';

import { ErrorMiddlewareDecorator } from '../../../src';

describe('ErrorMiddlewareDecorator', () => {
  it('should produce response when process call', () => {
    const middleware = (err: any, req: any, res: any, next: any): string =>
      'foo';
    const decorator = new ErrorMiddlewareDecorator(middleware);
    expect(
      decorator.process(sinon.spy(), sinon.spy(), sinon.spy(), sinon.spy()),
    ).to.equal('foo');
  });
});
