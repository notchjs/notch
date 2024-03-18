import type { Logger } from '@armscye/logging';

import { NoopLogger } from '..';

describe('NoopLogger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new NoopLogger();
  });

  it('should return undefined', () => {
    expect(logger.trace('trace')).toBeUndefined();
    expect(logger.debug('debug')).toBeUndefined();
    expect(logger.info('info')).toBeUndefined();
    expect(logger.warn('warn')).toBeUndefined();
    expect(logger.error('error')).toBeUndefined();
  });

  it('should return an instance of NoopLogger', () => {
    expect(logger.getLogger('NoopLogger')).toEqual(logger);
  });
});
