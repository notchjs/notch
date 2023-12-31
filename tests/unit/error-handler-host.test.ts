import { expect } from 'chai';

import { ErrorHandlerHost } from '../../src';
import { NoopErrorHandler } from './noop-error-handler';

describe('ErrorHandlerHost', () => {
  const errorHandler = new NoopErrorHandler();
  const errorHandlerHost = new ErrorHandlerHost(errorHandler);

  it('should wrap an instance of ErrorHandler', () => {
    expect(errorHandlerHost.getErrorHandler()).to.equal(errorHandler);
  });
});
