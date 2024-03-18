import { ErrorHandlerHost } from '../..';

describe('ErrorHandlerHost', () => {
  const ref = {};
  const handlerRefHost = new ErrorHandlerHost(ref as any);

  it('should wrap error handler reference', () => {
    expect(handlerRefHost.errorHandler).toEqual(ref);
  });
});
