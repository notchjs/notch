import { ErrorResponseGeneratorHost } from '../..';

describe('ErrorResponseGeneratorHost', () => {
  const ref = {};
  const responseGeneratorRefHost = new ErrorResponseGeneratorHost(ref as any);

  it('should wrap error response generator reference', () => {
    expect(responseGeneratorRefHost.responseGenerator).toEqual(ref);
  });
});
