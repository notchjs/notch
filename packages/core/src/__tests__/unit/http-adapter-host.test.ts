import { HttpAdapterHost } from '../..';

describe('HttpAdapterHost', () => {
  const ref = {};
  const adapterRefHost = new HttpAdapterHost(ref as any);

  it('should wrap HTTP adapter reference', () => {
    expect(adapterRefHost.httpAdapter).toEqual(ref);
  });
});
