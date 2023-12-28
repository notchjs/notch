import type { Logger } from '@armscye/logging';
import { expect } from 'chai';

import { NoopLogger } from '../../../src';

describe('NoopLogger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new NoopLogger();
  });

  it('should return undefined', () => {
    expect(logger.debug('debug')).to.be.undefined;
    expect(logger.info('info')).to.be.undefined;
    expect(logger.warning('warning')).to.be.undefined;
    expect(logger.error('error')).to.be.undefined;
    expect(logger.critical('critical')).to.be.undefined;
  });

  it('should return an instance of NoopLogger', () => {
    expect(logger.getLogger('NoopLogger')).to.equal(logger);
  });
});
