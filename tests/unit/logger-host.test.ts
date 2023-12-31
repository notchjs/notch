import { expect } from 'chai';

import { LoggerHost, NoopLogger } from '../../src';

describe('LoggerHost', () => {
  const logger = new NoopLogger();
  const loggerHost = new LoggerHost(logger);

  it('should wrap an instance of Logger', () => {
    expect(loggerHost.getLogger()).to.equal(logger);
  });
});
