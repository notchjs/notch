import { LoggerHost } from '../..';

describe('LoggerHost', () => {
  const ref = {};
  const loggerRefHost = new LoggerHost(ref as any);

  it('should wrap logger reference', () => {
    expect(loggerRefHost.logger).toEqual(ref);
  });
});
